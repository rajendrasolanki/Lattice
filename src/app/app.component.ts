import {Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public userForm: FormGroup;
    public userList = [];
    public passStrengthMsg;
    public passwordLen;
    public timerSub;
    public progress=null;
    constructor(private fb: FormBuilder){
        
    }
    ngOnInit(){
        this.userForm = this.fb.group({
            fullName:'',
            username: ['', Validators.required],
            password: ['', Validators.required],
            email: ['', [Validators.required , Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')]]
        });
        this.timerSub=Observable.timer(100,25);
    }
    save(){
        let sub =this.timerSub.subscribe(t => {            
            this.progress = t;
            if(this.progress == 100){
                sub.unsubscribe();
                this.progress = null;                
                this.userList.push(this.userForm.value);
                this.userForm.reset();
                this.passStrengthMsg='';
            }
        });
    }
    CheckPassword(){
        let password = this.userForm.controls['password'].value;
        this.passwordLen=password.length;
        if (this.passwordLen == 0){
            this.passStrengthMsg='';
        }else if (this.passwordLen <5){
            this.passStrengthMsg="too short password";
        } else if (this.passwordLen <7){
            this.passStrengthMsg="Medium password";
        }else{
            this.passStrengthMsg="Stronge password"
        }
    }
    initiateTimer(t) {
    }
}
