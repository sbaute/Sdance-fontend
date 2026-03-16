import { Component, input, output } from '@angular/core';

@Component({
  selector: 'pagination',
  imports: [],
  templateUrl: './pagination.html',
})
export class Pagination {

   totalElements = input<number>(0);
  currentPage = input<number>(0);
  pageSize = input<number>(10);

  pageChange = output<number>();

  totalPages(): number {
    return Math.ceil(this.totalElements() / this.pageSize());
  }

  pages(): number[] {
    return Array.from({ length: this.totalPages() }, (_, i) => i);
  }

  goTo(page: number) {
    if (page < 0 || page >= this.totalPages()) return;
    this.pageChange.emit(page);
  }

  next() {
    this.goTo(this.currentPage() + 1);
  }

  prev() {
    this.goTo(this.currentPage() - 1);
  }
}
