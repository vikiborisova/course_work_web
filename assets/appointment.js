document.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    // ДАТА (YYYY-MM-DD)
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const currentDate = `${yyyy}-${mm}-${dd}`;

    const dateInput = document.getElementById('date');
    dateInput.min = currentDate;

    // ЧАС (HH:MM)
    const hh = String(today.getHours()).padStart(2, '0');
    const min = String(today.getMinutes()).padStart(2, '0');
    const currentTime = `${hh}:${min}`;

    const timeInput = document.getElementById('time');
    dateInput.addEventListener('change', () => {
        if (dateInput.value === currentDate) {
            timeInput.min = currentTime;
        } else {
            timeInput.min = '';
        }
    });
    const form = document.getElementById('form');
    form.addEventListener('submit', (event) => {
        if (!validateForm()) {
            event.preventDefault();
        } else {
            alert("Успешно запазена консултация!");
        }
    });
});

//ГРЕШКИ
function showError(input, message) {
    const error = input.nextElementSibling;
    if (error && error.classList.contains('error')) {
        error.remove();
    }
    const errorMessage = document.createElement('span');
    errorMessage.className = 'error';
    errorMessage.textContent = message;
    input.parentNode.insertBefore(errorMessage, input.nextSibling);
}

function clearError(input) {
    const error = input.nextElementSibling;
    if (error && error.classList.contains('error')) {
        error.remove();
    }
}

function validateForm() {
    let isValid = true;

    const name = document.getElementById("name");
    const surname = document.getElementById("surname");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const date = document.getElementById("date");
    const time = document.getElementById("time");

    const currentDateTime = new Date();
    const selectedDateTime = new Date(`${date.value}T${time.value}`);

    //ИМЕ
    const bulgarianNameRegex = /^[А-Я][а-я]+$/;
    if (!bulgarianNameRegex.test(name.value.trim())) {
        showError(name, "Името трябва да започва с главна буква и да съдържа само български букви.");
        isValid = false;
    } else {
        clearError(name);
    }

    //ФАМИЛИЯ
    if (!bulgarianNameRegex.test(surname.value.trim())) {
        showError(surname, "Фамилията трябва да започва с главна буква и да съдържа само български букви.");
        isValid = false;
    } else {
        clearError(surname);
    }

    //ИМЕЙЛ
    const emailRegex = /^stu\d{10}@uni-plovdiv\.bg$/;
    if (!emailRegex.test(email.value.trim())) {
        showError(email, "Моля въведете вашият СТУДЕНТСКИ имейл.");
        isValid = false;
    } else {
        clearError(email);
    }

    //ПАРОЛА
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password.value)) {
        showError(password, "Паролата трябва да е поне 8 символа и да съдържа главна и малка буква, число и специален символ.");
        isValid = false;
    } else {
        clearError(password);
    }

    //ПРЕПОДАВАТЕЛ
    if (teacher.value === "default" || teacher.value === "") {
        showError(teacher, "Моля, изберете преподавател.");
        isValid = false;
    } else {
        clearError(teacher);
    }

    //ДАТА и ЧАС
    if (!date.value || !time.value || selectedDateTime <= currentDateTime) {
        showError(date, "Датата трябва да е предстояща.");
        isValid = false;
    } else {
        clearError(time);
    }

    return isValid;
}

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
}