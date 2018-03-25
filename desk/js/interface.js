;(function() {
    let intface = document.forms.interface;
    let elems = intface.elements;

    let filtElems = [].filter.call(elems, elem => {
        return elem.name != 'color' && elem.name != 'draw';
    });

    let count = 0;
    intface.addEventListener('click', function(e) {
        count = 0;
        for (var i = 0; i < filtElems.length; ++i) {
            let field = filtElems[i];
            field.value.trim();

            if (!field.value.length) {
                alert('fields must not be empty!');
                break;
            }

            if (field == elems[0] || field == elems[1]) {
                if (field.value < 3 || field.value > 26) {
                    alert('Rows and columns must be at least 4 and not more than 26');
                    break;
                }
            }

            if (field == elems[2] > 100) {
                alert('Scale should not exceed 100');
                break;
            }

            ++count;
        }
    });

    intface.addEventListener('submit', function(e) {
        e.preventDefault();

        if (count != filtElems.length) return;

        new Desk({
            rows: elems.rows.value,
            cols: elems.cols.value,
            scale: elems.scale.value,
            color: elems.color.value,
            where: document.body.querySelector('.workspace-scn__wrapper')
        });

    });
}());