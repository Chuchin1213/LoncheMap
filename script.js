// Datos con imágenes (Asegúrate de que estas URLs de imagen funcionen)
const paisesLonche = [
    { 
        id: 'MEX', 
        nombre: 'México', 
        videos: [
            { titulo: 'IRL POR CDMX CON MIRANDITA', imagen: 'https://images.kick.com/video_thumbnails/K5skwXjreoBE/eLS84X9Se00F/360.webp', link: 'https://kick.com/lonche/videos/fb6a33fe-2a88-43a8-8024-2df3c059786f' }
        ]
    },
    { 
        id: 'JPN', 
        nombre: 'Japón', 
        videos: [
            { titulo: 'Tokio de Noche', imagen: 'https://images.kick.com/thumbnails/c4d51-1712613151.jpg', link: 'https://kick.com/video/jpn1' }
        ]
    }
];

const idsVisitados = paisesLonche.map(p => p.id);

// Inicializar mundo
const world = Globe()
    (document.getElementById('globo'))
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
    .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
    .showAtmosphere(true);

// Cargar Países
fetch('https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
    .then(res => res.json())
    .then(countries => {
        world.polygonsData(countries.features)
            .polygonCapColor(feat => idsVisitados.includes(feat.properties.ISO_A3) ? 'rgba(0, 255, 100, 0.6)' : 'rgba(0, 100, 255, 0.05)')
            .polygonSideColor(() => 'rgba(0, 0, 0, 0)')
            .polygonStrokeColor(() => 'rgba(255, 255, 255, 0.1)')
            .onPolygonClick(feat => {
                const datos = paisesLonche.find(p => p.id === feat.properties.ISO_A3);
                if (datos) abrirSidebar(datos);
            });
    });

function abrirSidebar(datos) {
    const sidebar = document.getElementById('sidebar-videos');
    document.getElementById('sidebar-titulo').innerText = `Streams en ${datos.nombre}`;
    
    document.getElementById('lista-videos').innerHTML = datos.videos.map(v => `
        <li>
            <a href="${v.link}" target="_blank" class="video-item">
                <img src="${v.imagen}" class="video-thumb">
                <span class="video-title">📺 ${v.titulo}</span>
            </a>
        </li>
    `).join('');
    
    sidebar.classList.add('active');
}

window.cerrarSidebar = () => {
    document.getElementById('sidebar-videos').classList.remove('active');
};

world.controls().autoRotate = true;