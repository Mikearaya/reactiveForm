import { states, Address, Hero } from './../data-model';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import { HeroService } from '../hero-service.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
  


export class HeroDetailComponent implements OnChanges {
  @Input() hero: Hero;
  heroForm: FormGroup;
  states = states;
  nameChangeLog: string[] = [];

  logNameChange() {
    const nameControl = this.heroForm.get('name');
      nameControl.valueChanges.forEach((value: string) => this.nameChangeLog.push(value)
    );
  }
  constructor(private fb: FormBuilder, 
              private heroService: HeroService) {
    this.createForm();
    this.logNameChange();
  }
  ngOnChanges() {
    this.rebuildForm();
  }
  rebuildForm() {
    this.heroForm.reset({
      name: this.hero.name
      
    });
    this.setAddresses(this.hero.addresses);
  }
  get secretLairs(): FormArray {
    return this.heroForm.get('secretLairs') as FormArray;
  };
  createForm() {
    this.heroForm = this.fb.group({
      name: ['', Validators.required ],
      secretLairs: this.fb.array([]), // <-- secretLairs as an empty FormArray
      power: '',
      sidekick: ''
    });
  }
  addLair() {
    this.secretLairs.push(this.fb.group(new Address()));
  }
  setAddresses(addresses: Address[]) {
    const addressFGs = addresses.map(address => this.fb.group(address));
    const addressFormArray = this.fb.array(addressFGs);
    this.heroForm.setControl('secretLairs', addressFormArray);
  }

  prepareSaveHero(): Hero {
    const formModel = this.heroForm.value;
    const secretLairsDeepCopy: Address[] = formModel.secretLairs.map(
      (address: Address) => Object.assign({}, address)
    )
    const saveHero: Hero = {
      id: this.hero.id,
      name: formModel.name as string, 
      addresses: secretLairsDeepCopy
    };
    return saveHero;
  }

  onSubmit()  {
    this.hero = this.prepareSaveHero();
    this.heroService.updateHero(this.hero).subscribe();

  }
  revert()  {this.rebuildForm();}
}