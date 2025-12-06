#!/usr/bin/env node
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const JimpImport = require('jimp');
const Jimp = (JimpImport && JimpImport.default) ? JimpImport.default : JimpImport;

function parseArgs ()
{
    const argv = process.argv.slice(2);
    const opts = {
        input: 'public/assets/heros',
        outDir: null,
        tolerance: 80,
        color: null, // r,g,b or null to sample corner
        recursive: false
    };
    argv.forEach(a =>
    {
        if (a.startsWith('--'))
        {
            const [ k, v ] = a.slice(2).split('=');
            if (k === 'input') { opts.input = v; }
            if (k === 'outDir') { opts.outDir = v; }
            if (k === 'tolerance') { opts.tolerance = parseInt(v, 10) || opts.tolerance; }
            if (k === 'color') { opts.color = v.split(',').map(n => parseInt(n, 10)); }
            if (k === 'recursive') { opts.recursive = (v === 'true' || v === '1'); }
        }
    });
    return opts;
}

function listFiles (dir, recursive)
{
    const out = [];
    const items = fs.readdirSync(dir);
    for (const it of items)
    {
        const full = path.join(dir, it);
        const stat = fs.statSync(full);
        if (stat.isDirectory())
        {
            if (recursive) { out.push(...listFiles(full, recursive)); }
        }
        else if ((/\.(png|jpe?g|gif)$/i).test(it))
        {
            out.push(full);
        }
    }
    return out;
}

async function makeTransparentFile (filePath, outPath, opts)
{
    const img = await Jimp.read(filePath);
    const {width, height, data} = img.bitmap;

    let [ tr, tg, tb ] = [ 0,0,0 ];
    if (opts.color && opts.color.length === 3)
    {
        [ tr, tg, tb ] = opts.color;
    }
    else
    {
    // sample top-left pixel
        const idx = 0;
        tr = data[idx + 0];
        tg = data[idx + 1];
        tb = data[idx + 2];
    }

    const tol = Math.max(0, opts.tolerance || 0);
    img.scan(0, 0, width, height, function (x, y, idx)
    {
        const r = this.bitmap.data[idx + 0];
        const g = this.bitmap.data[idx + 1];
        const b = this.bitmap.data[idx + 2];
        const dist = Math.abs(r - tr) + Math.abs(g - tg) + Math.abs(b - tb);
        if (dist <= tol) { this.bitmap.data[idx + 3] = 0; }
    });

    await img.writeAsync(outPath);
    return outPath;
}

async function main ()
{
    const opts = parseArgs();
    const input = opts.input;
    if (!fs.existsSync(input))
    {
        console.error('Input path does not exist:', input);
        process.exit(1);
    }

    const files = fs.statSync(input).isDirectory()
        ? listFiles(input, opts.recursive)
        : [ input ];

    if (files.length === 0)
    {
        console.error('No image files found at', input);
        process.exit(1);
    }

    const outDir = opts.outDir || (fs.statSync(input).isDirectory() ? input : path.dirname(input));
    if (!fs.existsSync(outDir)) { fs.mkdirSync(outDir, {recursive: true}); }

    for (const f of files)
    {
        const name = path.basename(f, path.extname(f));
        const outName = `${name}_transparent.png`;
        const outPath = path.join(outDir, outName);
        try
        {
            await makeTransparentFile(f, outPath, opts);
            console.log('Wrote', outPath);
        }
        catch (e)
        {
            console.error('Failed', f, e.message);
        }
    }
}

main().catch(e => { console.error(e); process.exit(1); });
