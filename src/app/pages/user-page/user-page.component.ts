import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-page.component.html'
})
export class UserPageComponent implements OnInit {
  userId: number | null = null;
  isNewUser = false;
  userForm: FormGroup;
  roles: string[] = [];
  statuses: string[] = [];
  showPassword = false;
  showConfirmPassword = false;
  formSubmitted = false;
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.userForm = this.createForm();
  }
  
  ngOnInit(): void {
    // Load available roles and statuses
    this.userService.getRoles().subscribe(roles => this.roles = roles);
    this.userService.getStatuses().subscribe(statuses => this.statuses = statuses);
    
    // Get user ID from route params
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam === 'new') {
        this.isNewUser = true;
        this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(8)]);
        this.userForm.get('confirmPassword')?.setValidators([Validators.required, Validators.minLength(8)]);
        this.userForm.updateValueAndValidity();
      } else if (idParam) {
        this.userId = +idParam;
        this.loadUserData(+idParam);
      } else {
        this.router.navigate(['/users']);
      }
    });
  }
  
  private createForm(): FormGroup {
    return this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      firstName: [''],
      lastName: [''],
      role: ['', [Validators.required]],
      status: ['active', [Validators.required]],
      phoneNumber: [''],
      password: [''],
      confirmPassword: [''],
      changePassword: [false]
    }, {
      validators: this.passwordMatchValidator
    });
  }
  
  private passwordMatchValidator(fg: FormGroup) {
    const changePassword = fg.get('changePassword')?.value;
    const password = fg.get('password')?.value;
    const confirmPassword = fg.get('confirmPassword')?.value;
    
    if (changePassword && password !== confirmPassword) {
      fg.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }
  
  loadUserData(userId: number): void {
    this.userService.getUser(userId).subscribe({
      next: (user) => {
        if (user) {
          this.userForm.patchValue({
            username: user.username,
            email: user.email,
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            role: user.role,
            status: user.status,
            phoneNumber: user.phoneNumber || '',
            changePassword: false
          });
        } else {
          this.router.navigate(['/users']);
        }
      },
      error: (error) => {
        console.error('Error loading user:', error);
        this.router.navigate(['/users']);
      }
    });
  }
  
  onSubmit(): void {
    this.formSubmitted = true;
    
    if (this.userForm.invalid) {
      return;
    }
    
    const formValues = this.userForm.value;
    
    const userData: User = {
      id: this.userId || 0,
      username: formValues.username,
      email: formValues.email,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      role: formValues.role,
      status: formValues.status,
      phoneNumber: formValues.phoneNumber
    };
    
    if (this.isNewUser) {
      this.userService.addUser({
        ...userData,
        // Include password for new users
      }).subscribe({
        next: () => {
          this.router.navigate(['/users']);
        },
        error: (error) => {
          console.error('Error creating user:', error);
        }
      });
    } else {
      this.userService.updateUser(userData).subscribe({
        next: () => {
          this.router.navigate(['/users']);
        },
        error: (error) => {
          console.error('Error updating user:', error);
        }
      });
    }
  }
  
  onChangePasswordToggle(): void {
    const changePassword = this.userForm.get('changePassword')?.value;
    
    if (changePassword) {
      this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(8)]);
      this.userForm.get('confirmPassword')?.setValidators([Validators.required, Validators.minLength(8)]);
    } else {
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('confirmPassword')?.clearValidators();
      this.userForm.get('password')?.setValue('');
      this.userForm.get('confirmPassword')?.setValue('');
    }
    
    this.userForm.get('password')?.updateValueAndValidity();
    this.userForm.get('confirmPassword')?.updateValueAndValidity();
  }
  
  togglePasswordVisibility(field: 'password' | 'confirmPassword'): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
  
  cancel(): void {
    this.router.navigate(['/users']);
  }
}