/* ====== SET THEME/THEME_ICON ====== */

function toggleTheme() {
    const actualTheme = document.documentElement.getAttribute('data-theme')
    const newTheme = actualTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
}

document.addEventListener('DOMContentLoaded', () => {
    setTheme() 
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('app_misc') || 
            event.target.closest('.app_misc')) {
            toggleTheme()
            setIcon()
        }
    })
})

function setTheme() {
    let theme = localStorage.getItem('theme')
    if (!theme) {
        theme = 'light'
        localStorage.setItem('theme', theme)
    }
    
    document.documentElement.setAttribute('data-theme', theme)
    setIcon()
}

function setIcon() {
    const theme = document.documentElement.getAttribute('data-theme')
    const iconElement = document.getElementById('app_theme_icon')
    
    if (!iconElement) {
        const appContainer = document.getElementById('app_container')
        if (appContainer) {
            appContainer.innerHTML += `<i class="fa-solid ${theme === 'dark' ? 'fa-moon' : 'fa-circle'} app_misc" id="app_theme_icon"></i>`
        }
    } else {
        iconElement.className = `fa-solid ${theme === 'dark' ? 'fa-moon' : 'fa-circle'} app_misc`
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTheme()
})


/* ====== SET NO CHANGES TO SCREEN SIZE ====== */


document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && (event.key === '+' || event.key === '-' || event.key === '=')) {
        event.preventDefault();
    }
}, { passive: false })

document.addEventListener('wheel', function(event) {
    if (event.ctrlKey) {
        event.preventDefault()
    }
}, { passive: false })


/* ====== ELEVATOR WORK ======= */

document.addEventListener('click', (event) => {
    const getElementClicked = event.target.closest('.app_ui_change_floor_btn')
    const showFloor = document.getElementById('app_ui_actual_floor')
    const elevator = document.getElementById('app_inbuilding_elevator')

    if (getElementClicked) {
        const getIdLength = event.target.id.length
        const idLength = getIdLength === 12 ? -2 : -1
        const getIdValue = event.target.id.slice(idLength, getIdLength)
        showFloor.innerText = getIdValue
        const elevatorPosCalc = ((50 + (50 * 0.1) - 0.9) * (getIdValue - 1)) + 'px'
        elevator.style.bottom = elevatorPosCalc
        localStorage.setItem('floor', getIdValue)
        localStorage.setItem('floor_pos', elevatorPosCalc)
    }
})

/* ====== LOADING SAVED POSITION ======= */

document.addEventListener('DOMContentLoaded', () => {
    const showFloor = document.getElementById('app_ui_actual_floor')
    const elevator = document.getElementById('app_inbuilding_elevator')
    showFloor.innerHTML = localStorage.getItem('floor')
    elevator.style.bottom = localStorage.getItem('floor_pos')
})