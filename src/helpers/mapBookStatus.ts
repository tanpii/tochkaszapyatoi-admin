import { BookStatus } from "@/api/types";

export const mapBookStatus = (status: BookStatus): string => {
    const statusMap: Record<BookStatus, string> = {
        [BookStatus.AVAILABLE]: 'Доступно',
        [BookStatus.BOOKED]: 'Забронировано',
        [BookStatus.READING]: 'Чтение',
        [BookStatus.NOT_AVAILABLE]: 'Недоступно',
    };

    return statusMap[status] || 'Неизвестный статус';
};
