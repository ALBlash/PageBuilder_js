const screen = document.querySelector(".screen");
const type = document.getElementById("type");
const backgroundColor = document.getElementById("background-color");
const height = document.getElementById("height");
const width = document.getElementById("width");
const content = document.getElementById("content");
const color = document.getElementById("color");
const size = document.getElementById("size");
const borderWidth = document.getElementById("border-width");
const borderColor = document.getElementById('border-color');
const padding = document.getElementById('padding');
const margin = document.getElementById('margin');
const borderRadius = document.getElementById('border-radius');
const shadowX = document.getElementById('shadow-x');
const shadowY = document.getElementById('shadow-y');
const shadowColor = document.getElementById('shadow-color');
const elementTitle = document.getElementById('element-info');
const elementId = document.getElementById('element-id');
const textType = document.getElementById('type-txt');


document.addEventListener('DOMContentLoaded', getPreviousContent())


const addBtn = document.querySelector("#add");
addBtn.addEventListener("click", function () {


    // Create a new element if the element type is valid
    const newElement = document.createElement(type.value);

    // Set styles and properties of the new element
    newElement.style.backgroundColor = backgroundColor.value;
    newElement.style.height = height.value + "px";
    newElement.style.width = width.value + "px";
    newElement.style.color = color.value;
    newElement.style.fontSize = size.value + "px";
    newElement.style.fontFamily = textType.value;
    newElement.textContent = content.value;
    newElement.style.borderStyle = "solid";
    newElement.style.borderWidth = `${borderWidth.value}px`;
    newElement.style.borderColor = borderColor.value;
    newElement.style.padding = padding.value + "px";
    newElement.style.margin = margin.value + "px";
    newElement.style.borderRadius = borderRadius.value + "px";
    const bShadow = `${shadowX.value}px ${shadowY.value}px ${shadowColor.value}`;
    newElement.style.boxShadow = bShadow;
    newElement.setAttribute("date-created", `${getTheTime()}`);
    newElement.setAttribute("data-info", `${elementTitle.value}`);
    newElement.setAttribute("id", `${elementId.value}`);

    noStyle(newElement);
    screen.appendChild(newElement);

}
);



for (let i = 1; i <= 40; i++) {
    const option = document.createElement('option');
    option.text = i;
    size.add(option)
}


const emptyScreen = document.getElementById('delete');
emptyScreen.addEventListener('click', () => {
    if (confirm('Are you sure you want to delete all content?')) {
        const screen = document.querySelector('.screen');
        screen.innerHTML = '';
        localStorage.clear();
    }
});


///////no styling until there is something to style/////

function noStyle(elem) {
    const color = document.getElementById("color");
    const borderWidth = document.getElementById("border-width");
    const elementId = document.getElementById('element-id');
    const elementTitle = document.getElementById('element-info');

    if (color.value === "" || elementId.value === "") {
        elem.style.fontSize = "";
        elem.removeAttribute("id");
    }
}


// when was the element created?//
function getTheTime(elem) {
    const now = new Date();
    const day = now.getDay();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const formattedDate = `${day}-${month}-${year}`;
    const formattedTime = `${hours}-${minutes}-${seconds}`;

    return `${formattedDate} ${formattedTime}`
}



const saveBtn = document.getElementById('save');
let elementsArray = [];

// Load existing elements from localStorage if any
const storedElements = localStorage.getItem('screen-elements');
if (storedElements) {
    elementsArray = JSON.parse(storedElements);
}
// saving the elements each into an object and adding them to an array
saveBtn.addEventListener('click', () => {
    const screen = document.querySelector(".screen");
    const childElements = screen.children;

    // Iterate over child elements and create an object for each
    for (const element of childElements) {
        const elementType = element.tagName.toLowerCase(); // Get the element type (div, h1, p, etc.)
        const elementContent = element.textContent;
        const elemDate = element.getAttribute("date-created")
        const elementStyles = window.getComputedStyle(element);

        const elementObject = {
            type: elementType,
            content: elementContent,
            styles: {
                backgroundColor: elementStyles.backgroundColor,
                height: elementStyles.height,
                width: elementStyles.width,
                color: elementStyles.color,
                fontSize: elementStyles.fontSize,
                fontFamily: elementStyles.fontFamily,
                borderWidth: elementStyles.borderWidth,
                borderStyle: elementStyles.borderStyle,
                borderColor: elementStyles.borderColor,
                padding: elementStyles.padding,
                margin: elementStyles.margin,
                borderRadius: elementStyles.borderRadius,
                boxShadow: elementStyles.boxShadow,
            },
            date: elemDate,
        };

        // Add the element object to the array
        elementsArray.push(elementObject);
    }

    // Save the updated array in localStorage
    localStorage.setItem('screen-elements', JSON.stringify(elementsArray));
});


function getPreviousContent() {
    const screen = document.querySelector(".screen");
    const storedElements = localStorage.getItem('screen-elements');

    if (storedElements) {
        const elementsArray = JSON.parse(storedElements);

        // Loop through the elementsArray and create HTML elements for each object
        for (const elementData of elementsArray) {
            const newElement = document.createElement(elementData.type);

            // Set styles and properties of the new element based on elementData
            newElement.textContent = elementData.content;
            newElement.style.backgroundColor = elementData.styles.backgroundColor;
            newElement.style.height = elementData.styles.height;
            newElement.style.width = elementData.styles.width;
            newElement.style.color = elementData.styles.color;
            newElement.style.fontSize = elementData.styles.fontSize;
            newElement.style.fontFamily = elementData.styles.fontFamily;
            newElement.style.borderStyle = elementData.styles.borderStyle;
            newElement.style.borderWidth = elementData.styles.borderWidth;
            newElement.style.borderColor = elementData.styles.borderColor;
            newElement.style.padding = elementData.styles.padding;
            newElement.style.margin = elementData.styles.margin;
            newElement.style.borderRadius = elementData.styles.borderRadius;
            newElement.style.boxShadow = elementData.styles.boxShadow;

            // Add any additional attributes
            newElement.setAttribute("data-info", elementData.dataInfo);
            newElement.setAttribute("id", elementData.id);

            // Append the created element to the screen
            screen.appendChild(newElement);
        }
    }
}

