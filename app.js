document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');
    const registerForm = document.getElementById('register-form');
    const registerMessage = document.getElementById('register-message');
    const registerLink = document.getElementById('register-link');
    const backToLoginLink = document.getElementById('back-to-login-link');

    const routeForm = document.getElementById('route-form');
    const routeList = document.getElementById('route-list');
    const mapIframe = document.getElementById('map-iframe');

    const routes = [
        {
            start: "Plaza de Armas",
            end: "Museo Histórico Nacional",
            interest: "Histórico",
            description: "Ruta de Plaza de Armas a Museo Histórico Nacional, con puntos de interés en la Catedral Metropolitana, Museo de Arte Precolombino, y Palacio de La Moneda.",
            coordinates: {
                lat: -33.4373,
                lng: -70.6506
            }
        },
        {
            start: "Mercado Central",
            end: "Barrio Lastarria",
            interest: "Gastronómico",
            description: "Ruta de Mercado Central a Barrio Lastarria, pasando por La Vega Central y Barrio Bellavista.",
            coordinates: {
                lat: -33.4273,
                lng: -70.6412
            }
        }
    ];

    const users = [
        { username: "usuario1", password: "password1" },
        { username: "usuario2", password: "password2" }
    ];

    // Mostrar formulario de registro al hacer clic en "Regístrate aquí"
    registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('register-section').style.display = 'block';
    });

    // Volver al formulario de inicio de sesión
    backToLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('register-section').style.display = 'none';
        document.getElementById('login-section').style.display = 'block';
    });

    // Manejo del inicio de sesión
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            loginMessage.textContent = "Login exitoso";
            loginMessage.style.color = "green";
            document.getElementById('login-section').style.display = 'none';
            document.getElementById('create-route').style.display = 'block';
            document.getElementById('routes').style.display = 'block';
            document.getElementById('map').style.display = 'block';

            // Mostrar la primera ruta predeterminada en el mapa
            displayRouteOnMap(routes[0]);
        } else {
            loginMessage.textContent = "Usuario o contraseña incorrectos";
            loginMessage.style.color = "red";
        }
    });

    // Manejo del registro de usuario
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('new-username').value;
        const password = document.getElementById('new-password').value;

        const userExists = users.some(user => user.username === username);

        if (userExists) {
            registerMessage.textContent = "El usuario ya existe";
            registerMessage.style.color = "red";
        } else {
            users.push({ username, password });
            registerMessage.textContent = "Registro exitoso";
            registerMessage.style.color = "green";
        }
    });

    // Manejo del formulario de creación de rutas
    routeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const start = document.getElementById('start').value;
        const end = document.getElementById('end').value;
        const interest = document.getElementById('interests').value;

        const route = createRoute(start, end, interest);
        displayRoute(route);
    });

    // Función para crear una ruta
    function createRoute(start, end, interest) {
        return {
            start,
            end,
            interest,
            description: `Ruta de ${start} a ${end} con interés en ${interest}.`,
            coordinates: {
                lat: -33.4489,
                lng: -70.6693
            }
        };
    }

    // Función para mostrar una ruta en la lista
    function displayRoute(route) {
        const li = document.createElement('li');
        li.className = 'route-item';
        li.textContent = route.description;

        const starContainer = document.createElement('div');
        starContainer.className = 'stars';

        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('span');
            star.className = 'star';
            star.innerHTML = '★';
            star.dataset.rating = i;
            star.addEventListener('click', (e) => {
                const rating = e.target.dataset.rating;
                updateRating(starContainer, rating);
                alert(`Valoración para ${route.description}: ${rating} estrellas`);
            });
            starContainer.appendChild(star);
        }

        li.appendChild(starContainer);
        li.addEventListener('click', () => {
            displayRouteOnMap(route);
        });
        routeList.appendChild(li);
    }

    // Mostrar rutas iniciales
    routes.forEach(route => displayRoute(route));

    // Función para mostrar una ruta en el mapa
    function displayRouteOnMap(route) {
        const mapUrl = `https://www.google.com/maps?q=${route.coordinates.lat},${route.coordinates.lng}&z=15&output=embed`;
        mapIframe.src = mapUrl;
    }

    // Función para actualizar la valoración
    function updateRating(starContainer, rating) {
        const stars = starContainer.querySelectorAll('.star');
        stars.forEach(star => {
            if (star.dataset.rating <= rating) {
                star.classList.add('checked');
            } else {
                star.classList.remove('checked');
            }
        });
    }
});
