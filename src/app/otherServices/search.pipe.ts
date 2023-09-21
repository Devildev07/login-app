import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform {
    transform(items: any[], searchText: string, columns: string[] = []) {
        if (!searchText || items.length <= 0) {
            return items;
        }
        searchText = searchText.toString().toLowerCase();
        if (typeof items[0] == 'object') {
            return items.filter((item) => {
                if (columns.length > 0) {
                    return columns.some(key =>
                        item[key].toString().toLowerCase().includes(searchText)
                    );
                } else {
                    return Object.keys(item).some(key =>
                        item[key].toString().toLowerCase().includes(searchText)
                    );
                }
            });
        } else {
            return items.filter((item) =>
                item.toString().toLowerCase().includes(searchText)
            );
        }
    }
}
