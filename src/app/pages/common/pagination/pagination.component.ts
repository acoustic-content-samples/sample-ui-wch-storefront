/*
 * Copyright IBM Corp. 2017
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  // current page number
  @Input() pageNumber: number;
  // total items in all pages
  @Input() total: number;
  // page size
  @Input() pageSize: number;
  // check if content is being loaded
  @Input() loading: boolean;
  // how many pages to to show between next/prev
  @Input() pagesToShow: number;

  @Output() goPrev = new EventEmitter<boolean>();
  @Output() goNext = new EventEmitter<boolean>();
  @Output() goPage = new EventEmitter<number>();

  constructor() { }

  /** Gets the minimum item on current page */
  getMin(): number {
    return ((this.pageSize * this.pageNumber) - this.pageSize) + 1;
  }
  /** Gets the maximum item on current page  */
  getMax(): number {
    let max = this.pageSize * this.pageNumber;
    if (max > this.total) {
      max = this.total;
    }
    return max;
  }

  /** Goes to specified page */
  onPage(n: number): void {
    this.goPage.emit(n);
  }
  /** Goes to previous page */
  onPrev(): void {
    this.goPrev.emit(true);
  }

  /** Goes to next page */
  onNext(next: boolean): void {
    this.goNext.emit(next);
  }

  /** Gets the total number of pages */
  totalPages(): number {
    return Math.ceil(this.total / this.pageSize) || 0;
  }
  /** If current page is the last page */
  lastPage(): boolean {
    return this.pageSize * this.pageNumber > this.total;
  }

  /** Gest the page list to show */
  getPages(): number[] {
    const c = Math.ceil(this.total / this.pageSize);
    const p = this.pageNumber || 1;
    const pagesToShow = this.pagesToShow || 9;
    const pages: number[] = [];
    pages.push(p);
    const times = pagesToShow - 1;
    for (let i = 0; i < times; i++) {
      if (pages.length < pagesToShow) {
        if (Math.min.apply(null, pages) > 1) {
          pages.push(Math.min.apply(null, pages) - 1);
        }
      }
      if (pages.length < pagesToShow) {
        if (Math.max.apply(null, pages) < c) {
          pages.push(Math.max.apply(null, pages) + 1);
        }
      }
    }
    pages.sort((a, b) => a - b);
    return pages;
  }
}