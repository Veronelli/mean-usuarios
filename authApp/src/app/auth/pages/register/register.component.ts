import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private router: Router,
    private service: AuthService) { }

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  register() {
    const { nombre, email, password } = this.miFormulario.value;;
    console.log("Holaaa")
    this.service.register(nombre, email, password).subscribe(res => {
      if (res.ok === true) {
        this.router.navigateByUrl('/dashboard')

      }
      else {
        Swal.fire('Error', res.message, 'error')
      }
    });

  }

  ngOnInit(): void {
  }

}
