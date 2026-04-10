const paisesLonche = [
    { 
        id: 'MEX', 
        nombre: 'México', 
        videos: [
            { 
                titulo:'IRL POR CDMX CON MIRANDITA LEON Y ALAN ARRIETA...',
                imagen:'https://images.kick.com/video_thumbnails/K5skwXjreoBE/eLS84X9Se00F/360.webp',
                link:'https://kick.com/lonche/videos/fb6a33fe-2a88-43a8-8024-2df3c059786f'
            },
            {
                titulo:'SUPERNOVA GENESIS "EL SPARRING...',
                imagen:'https://images.kick.com/video_thumbnails/K5skwXjreoBE/JDqBSSI53ewe/360.webp',
                link:'https://kick.com/lonche/videos/4daa8ae8-5cae-48be-8bb6-5b9cf4dbc19d'
            },   
           
        ]
    },
    { 
        id: 'JPN', 
        nombre: 'Japón', 
        videos: [
            { titulo: 'Tokio de Noche', imagen: 'https://images.kick.com/thumbnails/c4d51-1712613151.jpg', link: 'https://kick.com/video/jpn1' }
        ]
    },
    { 
        id: 'COL', 
        nombre: 'Colombia', 
        videos: [
            { 
                titulo: '🌈 BUSCO VERGA MILLONARIA...', 
                imagen: 'https://images.kick.com/video_thumbnails/K5skwXjreoBE/B3qKxIvoA5xC/360.webp', 
                link: 'https://kick.com/lonche/videos/b64ab9a1-0693-4786-8e8f-1c3c8c463592' 
            },
            { 
                titulo: '✨ ULTIMO DÍA EN COLOMBIA...', 
                imagen: 'https://images.kick.com/video_thumbnails/K5skwXjreoBE/RnKS6wog0yVh/360.webp', 
                link: 'https://kick.com/lonche/videos/da00fe06-7ada-45ad-bbfd-d083bdbffa0c' 
            }
        ]
    },
    { 
        id: 'USA', 
        nombre: 'Estados Unidos', 
        videos: [
            { 
                titulo:'ME ENCANTAN LAS VERGAS GRANDES Y VENUDAS ...',
                imagen:'https://images.kick.com/video_thumbnails/K5skwXjreoBE/0NMa04VAOb0a/360.webp',
                link:'https://kick.com/lonche/videos/9aa21e22-b1c1-4aba-b68b-2c4140c1ec43'
            },
            { 
                titulo:'NOCHE DE STAKE CON PAN...',
                imagen:'https://images.kick.com/video_thumbnails/K5skwXjreoBE/x1sNq5Mlehrh/360.webp',
                link:'https://kick.com/lonche/videos/0db06672-c943-4ca7-bf7d-a3f90e628d06'
            },

        ]
    },
];

const idsVisitados = paisesLonche.map(p => p.id);

// Inicializar el globo
const world = Globe()
    (document.getElementById('globo'))
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
    .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
    .showAtmosphere(true);

// Función para abrir la barra lateral
function abrirSidebar(datos) {
    const sidebar = document.getElementById('sidebar-videos');
    const titulo = document.getElementById('sidebar-titulo');
    const lista = document.getElementById('lista-videos');

    if (titulo) titulo.innerText = `Streams en ${datos.nombre}`;
    
    if (lista) {
        lista.innerHTML = datos.videos.map(v => `
            <li>
                <a href="${v.link}" target="_blank" class="video-item">
                    <img src="${v.imagen}" class="video-thumb">
                    <span class="video-title">📺 ${v.titulo}</span>
                </a>
            </li>
        `).join('');
    }
    
    sidebar.classList.add('active');
}

window.cerrarSidebar = () => {
    document.getElementById('sidebar-videos').classList.remove('active');
};

// Cargar geometría de países y activar clicks
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

world.controls().autoRotate = true;