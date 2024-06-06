import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/Product';
import { ProductService } from '../../product.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  products: Product[] | undefined;
  constructor(private proService: ProductService) {}

  ngOnInit(): void {
    this.proService.getProducts().subscribe((pro) => {
      this.products = pro;
    });
  }

  deteteProduct(id: number | string | undefined) {
    if (confirm('Bạn có chắc chắn muốn xóa không?')) {
      this.proService.deleteProduct(id).subscribe(() => {
        alert('Xóa sản phẩm thành công');
        this.proService.getProducts().subscribe((pro) => {
          this.products = pro;
        });
      });
    }
  }
}
