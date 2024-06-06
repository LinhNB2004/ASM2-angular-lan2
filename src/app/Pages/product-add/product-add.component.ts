import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/Product';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../product.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.scss',
})
export class ProductAddComponent implements OnInit {
  product: Product = {} as Product;
  productForm: FormGroup = {} as FormGroup;

  constructor(
    private proService: ProductService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      thumbnail: ['', [Validators.required, Validators.minLength(3)]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {}

  handleSubmit() {
    if (this.productForm.valid) {
      console.log(this.productForm.value);
      this.proService
        .createProduct(this.productForm.value)
        .subscribe((data) => {
          console.log('Thêm thành công', data);
          alert('Thêm thành công');
          this.router.navigate(['/admin']);
        });
    }
  }
}
