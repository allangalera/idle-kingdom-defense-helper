<script lang="ts">
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import type { Sprinkles } from '$lib/styles/sprinkles.css';
  import { concatClasses } from '$lib/styles/utils';
  import { match } from 'oxide.ts';

  import * as styles from './index.css';

  export let size: Sprinkles['size'] = 7;
  export let name:
    | 'Ellie'
    | 'Evan'
    | 'Gabriel'
    | 'Tristan'
    | 'Carlos'
    | 'Luke'
    | 'Christian'
    | 'Logan'
    | 'Austin'
    | 'Aisha'
    | 'Adrian'
    | 'Mason'
    | 'Xavier'
    | 'Diego'
    | 'Miguel'
    | 'Ryan'
    | 'Daniel'
    | 'Blake'
    | 'Julian'
    | 'Leonidas'
    | 'Anthony'
    | 'Brian'
    | 'Lucas'
    | 'Sophia'
    | 'Camilla'
    | 'Vincent'
    | 'Randolph'
    | 'Jackson'
    | 'Rodrick'
    | 'Harold'
    | 'Marcus'
    | 'Raven'
    | 'Marian'
    | 'Hilde';

  const fileName = match(name, [
    ['Ellie', 'sprHeroArcher01'],
    ['Evan', 'sprHeroArcher02'],
    ['Gabriel', 'sprHeroArcher03'],
    ['Tristan', 'sprHeroArcher04'],
    ['Carlos', 'sprHeroBarbarian01'],
    ['Luke', 'sprHeroGunner01'],
    ['Christian', 'sprHeroGunner02'],
    ['Logan', 'sprHeroKnight01'],
    ['Austin', 'sprHeroThrower'],
    ['Aisha', 'sprHeroWizard01'],
    ['Adrian', 'sprHeroWizard02'],
    ['Mason', 'sprHeroWizard03'],
    ['Xavier', 'sprHeroWizard04'],
    ['Diego', 'sprHeroBarbarian02'],
    ['Miguel', 'sprHeroBarbarian03'],
    ['Ryan', 'sprHeroHorseman01'],
    ['Daniel', 'sprHeroHorseman02'],
    ['Blake', 'sprHeroHorseman03'],
    ['Julian', 'sprHeroKnight02'],
    ['Leonidas', 'sprHeroKnight03'],
    ['Anthony', 'sprHeroKnight04'],
    ['Brian', 'sprHeroKnight05'],
    ['Lucas', 'sprHeroKnight06'],
    ['Sophia', 'sprHeroWizard05'],
    ['Camilla', 'sprHeroWizard06'],
    ['Vincent', 'sprHeroKnight07'],
    ['Randolph', 'sprHeroKnight08'],
    ['Jackson', 'sprHeroKnight09'],
    ['Rodrick', 'sprHeroHorseman04'],
    ['Harold', 'sprHeroWizard07'],
    ['Marcus', 'sprHeroKnight10'],
    ['Raven', 'sprHeroWizard08'],
    ['Marian', 'sprHeroArcher05'],
    ['Hilde', 'sprHeroBarbarian04'],
  ]);
</script>

<img
  loading="lazy"
  src={`/images/plist/${fileName}.png`}
  alt={name}
  title={name}
  class={concatClasses(
    styles.img,
    sprinkles({
      size: size,
    })
  )}
/>
