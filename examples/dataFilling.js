;(function() {
    let elems = document.body.querySelectorAll("[data-filling]");
    if (!elems) return;

    function getData(field, elem, selected) {
        let xhr = new XMLHttpRequest();
        xhr.open('get', './json/' + field + '-list.json', true);

        xhr.onprogress = function () {
            // if (this.readyState != 4) return;

            if (this.status == 404) {
                alert('Не нашел ресур: ' + field + '-list.json');
                return;
            }
            if (this.status != 200) {
                alert(this.status + ': ' + this.statusText + '\n' +
                    `Ограничение браузеров на использхование аякса(COR...)((
localhost все робыть, через вебшторм тоже. Если не поняли о чем я, то прочтите текстовый файл 'ПРОЧТИТЕ.txt'
представленный к заданиям`);
                return;
            }

            try {
            res = JSON.parse(this.responseText);
            addToList(res, elem, selected);
            } catch(e) {
                // alert('Data haven\'t got');
            }
        }

        xhr.send();
    }

    function addToList(data, elem, selected) {
        if (elem.tagName == 'SELECT') {
            let opt;
            data.forEach((item, inx) => {
                let option = new Option(item, item.toLowerCase(), false, true);

                if (item == selected) opt = option;

                elem.appendChild(option);
            });

            opt.selected = true;
        }

        if (elem.tagName == 'DATALIST') {
            if (selected) {
                elem.previousElementSibling.value = selected;
            }
            
            data.forEach(item => {
                let option = "<option value='" + item + "'>";
                elem.insertAdjacentHTML('beforeEnd', option);
            });
        }
    }

    Array.prototype.forEach.call(elems, elem => {
        let data = elem.dataset.filling;
        if (!data) return;

        let split = data.split(':');
        getData(split[0], elem, split[1]);
    });
}());