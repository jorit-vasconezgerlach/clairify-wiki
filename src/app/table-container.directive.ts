// table-container.directive.ts
import { Directive, ElementRef, Renderer2, AfterViewChecked } from '@angular/core';

@Directive({
  selector: 'table',
})
export class TableContainerDirective implements AfterViewChecked {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewChecked(): void {
    const tables = this.el.nativeElement.querySelectorAll('table');
    
    tables.forEach((table: { parentNode: any; }) => {
      const tableContainer = this.renderer.createElement('div');
      this.renderer.addClass(tableContainer, 'tableContainer');

      // Insert the new div before the table
      this.renderer.insertBefore(table.parentNode, tableContainer, table);

      // Move the table inside the new div
      this.renderer.appendChild(tableContainer, table);
    });
  }
}
