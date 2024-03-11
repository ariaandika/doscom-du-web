<script context="module">
// @ts-check

/** @type {import("../app.ts").Data} */
const { data } = await fetch("/data").then(e=>e.json())
const classes = Object.keys(data)

</script>

<script>

let currentClass = classes[0]

$: console.log({currentClass})

</script>
<section class="h-full bg-gray-50 grid place-items-center">

<div class="absolute w-full h-full z-10">
<iframe
    class="w-full h-full"
    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
></iframe>
</div>

<div class="p-8 bg-white shadow-lg rounded-xl min-w-[680px] min-h-[400px] flex flex-col gap-2 z-40">
    <h1 class="text-4xl font-bold mb-4">Presensi Doscom University</h1>

    <label class="flex flex-col gap-1">
        <span class="text-sm font-semibold">kelas</span>
        <select
            class="px-4 py-2
                bg-white border appearance-none cursor-pointer rounded-md border-gray-600
                focus:border-indigo-600 focus:outline-indigo-600
            "
            bind:value={currentClass}
        >
        {#each classes as clas}
            <option value={clas}>{clas}</option>
        {/each}
        </select>
    </label>


    <label class="flex flex-col gap-1">
        <span class="text-sm font-semibold">nama</span>
        <select
            class="px-4 py-2
                bg-white border appearance-none cursor-pointer rounded-md border-gray-600
                focus:border-indigo-600 focus:outline-indigo-600
            "
        >
        {#each data[currentClass] as { nama: name }}
            <option value={name}>{name}</option>
        {/each}
        </select>
    </label>

    <div class="my-2">
        <button class="px-4 py-2 bg-indigo-600 text-white font-bold rounded-md">Submit</button>
    </div>
</div>

</section>


