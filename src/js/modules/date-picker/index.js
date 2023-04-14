import DSDatePicker from '@scottish-government/pattern-library/src/components/date-picker/date-picker';

export const init = () => {
    const element = document.querySelector('.js-date-picker');
    if (element) {
        const datepicker = new DSDatePicker(element, { imagePath: '/static/img/' });
        return datepicker.init();
    }
};

init();