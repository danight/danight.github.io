;(function () {
    function elt(nodeName, attrs, ...anyNodes) {
        let elem = document.createElement(nodeName);

        for (var key in attrs) {
            if (!attrs.hasOwnProperty(key)) continue;
            elem.setAttribute(key, attrs[key]);
        }

        anyNodes.forEach(any => {
            let node = any;
        if (typeof node == 'string') {
            node = document.createTextNode(any);
        }

        elem.append(node);
    })
        ;

        return elem;
    }

    class Desk {
        constructor(props) {
            this.rows = +props.rows;
            this.cols = +props.cols;

            this.color = props.color;
            this.scale = props.scale;
            this.where = props.where;

            this.abc = this.createAlphabetic();

            this.draw();
        }

        createAlphabetic() {
            let symb = '';
            for (var i = 97; i < 97 + this.cols; ++i) {
                symb += String.fromCharCode(i);
            }
            return symb;
        }

        draw() {
            let table = elt('table', {class: 'desk page__desk'});

            table.style.width = (this.cols + 2) * this.scale + 'px';
            for (var i = 0; i < this.rows + 2; ++i) {
                let tr = table.appendChild(elt('tr', {class: 'row desk__row'}));

                for (var j = 0; j < this.cols + 2; ++j) {
                    let td = tr.appendChild(elt('td',
                        {class: 'data table__data'}));

                    if ((i == 0 || i == this.rows + 1) &&
                        (j > 0 && j <= this.rows)) {

                        td.textContent = this.abc[j - 1];
                        td.classList.add('data--border');
                    }

                    if ((i > 0 && i <= this.rows) &&
                        (j == 0 || j == this.rows + 1)) {

                        td.textContent = this.rows - i + 1;
                        td.classList.add('data--border');
                    }

                    if ((i > 0 && i < this.rows + 1) &&
                        (j > 0 && j < this.rows + 1)) {

                        if ((i + j) % 2) {
                            td.style.background = this.color;
                        }

                        td.style.width = td.style.height = this.scale + 'px';
                    }

                    if (i == 0 || j == this.cols + 1)
                        td.classList.add('data--reverse');
                }
            }

            this.where.innerHTML = '';
            this.where.append(table);
        }
    }

    window.Desk = Desk;
}());