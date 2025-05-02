import _ from "lodash";

const formatDateToVN = (date: string | Date | null | undefined, format: string = 'dd/mm/yyyy') => {
    if (!date || !_.isDate(new Date(date))) {
        return '';
    }

    const formattedDate = new Intl.DateTimeFormat('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(new Date(date));

    if (format === 'dd/mm/yyyy') {
        return formattedDate.replace(/\//g, '-');
    }

    return new Intl.DateTimeFormat('vi-VN', {
        year: format.includes('yyyy') ? 'numeric' : undefined,
        month: format.includes('mm') ? '2-digit' : undefined,
        day: format.includes('dd') ? '2-digit' : undefined,
    }).format(new Date(date));
};


export {
    formatDateToVN
}
