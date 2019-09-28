function rotateTriangle() {
    
    let containerArray = document.getElementsByClassName('js-container');
    
    let angle = 10;
    
    containerArray.forEach((item)=>{
        item.style.cssText = `transform: rotate(10deg);`;
    });
}

rotateTriangle();