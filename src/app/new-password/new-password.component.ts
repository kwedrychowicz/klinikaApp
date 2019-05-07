import { Component, OnInit } from '@angular/core';
import {Validators, FormGroup, FormBuilder} from "@angular/forms";
import {AuthService} from "../shared/security/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-newpassword',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent {
  form: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router) {
      this.form = this.fb.group({
        newpassword: ['', Validators.required],
        confirm: ['', Validators.required]
    });
    }
    isPasswordMatch() {
      const val = this.form.value;
      return val && val.newpassword && val.newpassword === val.confirm;

    }
    updatePassword() {
      const val = this.form.value;

      this.authService.updatePassword(val.newpassword)
          .subscribe(
              () => {
                  alert('Password change!');
                  this.router.navigateByUrl('/home');
              },
              err => alert('Sorry, We haw an error.')
          );
  }


}
