import DSDatePicker from '@scottish-government/pattern-library/src/components/date-picker/date-picker';

export const init = () => {
    const basic = document.querySelector('.js-date-picker');
    if (basic) {
        const datepicker = new DSDatePicker(basic, { imagePath: '/static/img/' });
        return datepicker.init();
    }
};

init();