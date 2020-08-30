const inputStar = document.getElementById('star');

const onStarClick = (number) => {
    inputStar.value = number;
    const target = event.target;
    for (child of target.parentNode.children) {
        child.classList.remove("active");
    };
    target.classList.toggle("active");
}