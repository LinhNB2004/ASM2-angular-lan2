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
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss',
})
export class ProductEditComponent implements OnInit {
  product: Product = {} as Product;
  productForm: FormGroup = {} as FormGroup;

  constructor(
    private proService: ProductService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      thumbnail: ['', [Validators.required, Validators.minLength(3)]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.proService.getProductByID(id).subscribe((pro) => {
        this.product = pro;
        this.productForm.patchValue(this.product);
      });
    }
  }

  handleSubmit() {
    if (this.productForm.valid) {
      const updatedProduct: Product = {
        ...this.product,
        ...this.productForm.value,
      };

      console.log(this.productForm.value);

      this.proService.updateProduct(updatedProduct).subscribe((data) => {
        console.log('Update thành công', data);
        alert('Update thành công');
        this.router.navigate(['/admin']);
      });
    }
  }
}
