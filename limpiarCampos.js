const fs = require("fs")
const path = require("path")
const campos = JSON.parse(fs.readFileSync(path.join(__dirname, 'src/assets/camposOriginal.json')))
const recorridos = JSON.parse(fs.readFileSync(path.join(__dirname, 'src/assets/recorridosOriginal.json')))



const camposValidos = campos.filter(
  (i) => recorridos.filter((r) => r.campo == i.url).length > 0
)
recorridos.forEach(e => {
  e.par = e.par.split(',').map(i => parseInt(i))
  e.handicap = e.handicap.split(',').map(i => parseInt(i))
  e.metros = e.metros.split(',').map(i => parseInt(i))
  e.metros_ida = parseInt(e.metros_ida)
  e.metros_total = parseInt(e.metros_total)
  e.metros_vuelta = parseInt(e.metros_vuelta)
  e.par_total_vc = parseFloat(e.par_total_vc)
  e.par_total_vs = parseInt(e.par_total_vs)

})


fs.writeFileSync(path.join(__dirname, 'src/assets/campos.json'),JSON.stringify(camposValidos))
fs.writeFileSync(path.join(__dirname, 'src/assets/recorridos.json'),JSON.stringify(recorridos, null, 3))