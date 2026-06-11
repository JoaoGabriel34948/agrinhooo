// ================= LOADER =================
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.innerHTML = `<div class="loader-content"><i class="fa-solid fa-leaf"></i><p>Carregando Agro Forte...</p></div>`;
    document.body.prepend(loader);

    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }, 1500);
});

// ================= DARK MODE =================
const darkBtn = document.getElementById('darkMode');
darkBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('darkMode', document.body.classList.contains('dark'));
});

// Ativar dark mode salvo
if(localStorage.getItem('darkMode') === 'true'){
    document.body.classList.add('dark');
}

// ================= CONTADORES =================
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 200; // velocidade

        if(count < target){
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 10);
        } else{
            counter.innerText = target;
        }
    };
    updateCount();
});

// ================= SCROLL ANIMATION =================
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }
    });
}, {threshold:0.2});

sections.forEach(section => section.classList.add('hidden'));
sections.forEach(section => observer.observe(section));

// ================= GALERIA MODAL =================
const galleryImages = document.querySelectorAll('.grid-galeria img');
galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.classList.add('modal-galeria');
        modal.innerHTML = `<span class="close">&times;</span><img src="${img.src}" alt="">`;
        document.body.appendChild(modal);

        modal.querySelector('.close').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', e => {if(e.target === modal) modal.remove()});
    });
});

// ================= QUIZ =================
const quizContainer = document.querySelector('.quiz-container');
if(quizContainer){
    const quizData = [
        {q:"A agricultura sustentável ajuda a preservar o meio ambiente?", a:["Sim","Não"], correct:0},
        {q:"Irrigação inteligente economiza água?", a:["Não","Sim"], correct:1},
        {q:"Robôs agrícolas aumentam eficiência?", a:["Sim","Não"], correct:0},
    ];

    let current = 0;
    let score = 0;

    const questionEl = document.getElementById('question');
    const answerEls = document.querySelectorAll('.answer');
    const submitBtn = document.getElementById('submit');

    const loadQuiz = () => {
        deselect();
        questionEl.innerText = quizData[current].q;
        answerEls.forEach((el,i) => {
            el.nextElementSibling.innerText = quizData[current].a[i];
        });
    };

    const deselect = () => answerEls.forEach(el => el.checked = false);

    submitBtn.addEventListener('click', () => {
        let answer;
        answerEls.forEach((el,i) => {if(el.checked) answer=i});
        if(answer!==undefined){
            if(answer === quizData[current].correct) score++;
            current++;
            if(current < quizData.length) loadQuiz();
            else quizContainer.innerHTML = `<h2>Você acertou ${score}/${quizData.length} questões!</h2>`;
        }
    });

    loadQuiz();
}

// ================= SCROLL SUAVE MENU =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({behavior:'smooth'});
    });
});