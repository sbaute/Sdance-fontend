import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth-service';
import { Router } from '@angular/router';


type LoginForm = FormGroup<{
  username: FormControl<string>;
  password: FormControl<string>;
}>;


@Component({
  selector: 'login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {


  loading = false;
  errorMsg = '';

  form: LoginForm;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: this.fb.nonNullable.control('', [Validators.required]),
      password: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  submit() {
  this.errorMsg = '';
  console.log("aprete login");

  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  this.loading = true;

  const { username, password } = this.form.getRawValue();

  this.authService.login({ username, password }).subscribe({
    next: () => {
      this.loading = false;
      this.router.navigate(['/dashboard']);
    },
    error: (err) => {
      this.loading = false;
      this.errorMsg = err?.error?.message ?? 'Error al iniciar sesión';
    },
  });
}



 }
