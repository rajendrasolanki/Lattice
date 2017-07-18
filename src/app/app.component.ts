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
    public isEdit=false;
    public EditIndex;
    constructor(private fb: FormBuilder){
        
    }
    ngOnInit(){
        this.userForm = this.fb.group({
            id:'',
            fullName:'',
            username: ['', Validators.required],
            password: ['', Validators.required],
            email: ['', [Validators.required , Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]]
        });
        this.timerSub=Observable.timer(100,25);
    }
    save(){
        let sub =this.timerSub.subscribe(t => {            
            this.progress = t;
            if(this.progress == 100){
                sub.unsubscribe();
                if (this.isEdit){
                    this.SaveEdit();
                }
                else{
                    this.userList.push(this.userForm.value);
                    this.userForm.reset();
                }                
                this.progress = null;
                this.passStrengthMsg='';
            }
        });
    }
    CheckPassword(){
        let password = this.userForm.controls['password'].value;
        if (password!=null)
        this.passwordLen=password.length;
        if (this.passwordLen == 0){
            this.passStrengthMsg='';
        }else if (this.passwordLen <5){
            this.passStrengthMsg="too short password";
        } else if (this.passwordLen <7){
            this.passStrengthMsg="Medium password";
        }else{
            this.passStrengthMsg="Strong password"
        }
    }
    DeleteRecord(index){
        this.userList.splice(index, 1);
    }
    EditRecord(index){
        this.userForm.setValue(this.userList[index]);
        this.EditIndex = index;
        this.isEdit = true;
    }
    SaveEdit(){
        this.userList[this.EditIndex] = this.userForm.value;
        this.userForm.reset();
        this.isEdit = false;
    }
}
