import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-ageverify',
  templateUrl: './ageverify.component.html',
  styleUrls: ['./ageverify.component.css']
})
export class AgeverifyComponent implements OnInit {

  currentDate = new Date();
  form!: FormGroup;
  @Output() ageVerified = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      birthdate: ['']
    });
  }

  verifyAge() {
    const birthdate = new Date(this.form.get('birthdate')?.value);
    const age = this.calculateAge(birthdate);
    const isAgeVerified = age >= 21;
    this.ageVerified.emit(isAgeVerified);
    if (isAgeVerified) {
      sessionStorage.setItem('ageVerified', 'true');
    }
  }
  
  
  private calculateAge(birthdate: Date): number {
    const ageDifMs = Date.now() - birthdate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
