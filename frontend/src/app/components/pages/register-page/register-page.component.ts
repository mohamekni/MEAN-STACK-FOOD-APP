import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

registerForm!:FormGroup;
isSubmitted = false;
returnUrl = ';'
  constructor(
    private formBuilder : FormBuilder,
    private userService : UserService,
    private activatedRoute : ActivatedRoute,
    private router : Router
  ){ }
ngOnInit(): void {
  this.registerForm = this.formBuilder.group({

  })

}
}
