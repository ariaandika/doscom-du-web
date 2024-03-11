import { compile } from "svelte/compiler"
import post from "postcss"
import plugin from "tailwindcss"
const s=`@tailwind base;@tailwind components;@tailwind utilities;html,body{@apply h-full overflow-hidden}`
const { css } = await post(plugin({ content:["./src/**/*.{svelte,ts}"] })).process(s,{from:""})
const js = compile(await Bun.file("./src/App.svelte").text()).js.code
await Bun.write("./node_modules/app.js",js+"\nnew Component({target:document.querySelector('#app')})")
const { outputs:[b] } = await Bun.build({ entrypoints: ["./node_modules/app.js"], minify: true })
const svelte = await b.text()
let html = `\
<!DOCTYPE html><html lang="en">
<head><style>${css}</style></head>
<body><div id="app" class="h-full overflow-hidden"></div>
<script type="module">${svelte}</script>
</body></html>`


export type Data = typeof data
const data = {
    data: {
        "Kelas A": [
            { nama: "John Billiey" },
            { nama: "Aston Maritim" },
        ],
        "Kelas B": [
            { nama: "Yope Dinner" },
            { nama: "Corel Party" },
        ]
    } as Record<string,{ nama: string }[]>
}

const arg = process.argv.slice(2)

function serve(request: Request) {
    try {
        const u = new URL(request.url)

        if (u.pathname === '/') {
            return new Response(html,{ headers:{ "content-type": "text/html" } })
        }

        if (u.pathname === '/data') {
            return Response.json(data)
        }

        return new Response("NOT_FOUND",{ status: 404 })
    } catch (err) {
        console.error(err)
        return new Response("INTERNAL_ERROR",{ status: 500 })
    }
}

Bun.serve({
    fetch: serve
})

