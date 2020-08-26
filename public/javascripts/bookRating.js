const onStarClick = (number) => {
    const target = event.target;
    for (child of target.parentNode.children) {
        child.classList.remove("active");
    };
    target.classList.toggle("active");
}