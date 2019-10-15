class Carousel {
    currentItem;
    options;

    /**
     * @param {HTMLElement} element
     * @param {object} options
     * @param {object} options.slideToScroll Number of items to scroll
     * @param {object} options.slideVisible Number of visible element in a slide
     */


    constructor(element, options = {}) {
        this.element = element
        this.options = Object.assign({}, {
            slideToScroll: 1,
            slideVisible: 1
        }, options);

        let children = [].slice.call(element.children);
        this.currentItem = 0;
        this.root = this.createDivWithClass('carousel');
        this.container = this.createDivWithClass('carousel__container');

        this.root.appendChild(this.container);
        this.element.appendChild(this.root);
        this.items = children.map((child) => {
            let item = this.createDivWithClass('carousel__item');

            item.appendChild(child);
            this.container.appendChild(item);
            return item
        })
        this.setStyle();
        this.createNavigation();
    }

    /**
     * Applies the right dimensions to the carousel elements
     */
    setStyle() {
        let ratio = this.items.length / this.options.slideVisible;
        this.container.style.width = (ratio * 100) + "%";
        this.items.forEach(item => {
            item.style.width = ((100 / this.options.slideVisible) / ratio) + "%"

        });
    }

    createNavigation() {
        let nextButton = this.createDivWithClass('carousel__next');
        let prevButton = this.createDivWithClass('carousel__prev');
        this.root.appendChild(nextButton);
        this.root.appendChild(prevButton);
        nextButton.addEventListener('click', this.next.bind(this));
        nextButton.addEventListener('click', this.prev.bind(this));
    }

    next() {
        this.gotoItem(this.currentItem + this.options.slideToScroll)
    }

    prev() {
        this.gotoItem(this.currentItem - this.options.slideToScroll)
    }


    /**
     * Move the carousel to the targeted element :
     * @param {number} index
     */
    gotoItem(index) {

        let translateX = index * 100 / this.items.length
        this.container.style.transform = 'translate3d(' + translateX + ' %, 0, 0)'
        this.currentItem = index
    }


    /**
     * @param {string} className
     * @returns {HTMLElement}
     */

    createDivWithClass(className) {
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div
    }

}


document.addEventListener('DOMContentLoaded', function () {

    new Carousel(document.querySelector('#carousel1'), {
        slideVisible: 3
    })

})