<script lang="ts">
  import GridItem from '$lib/components/GridItem/index.svelte';
  import Heading from '$lib/components/Heading/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import {
    formatSkillDescription,
    formatSkillName,
    formatSkillValue,
    isCurrentSkillLevel,
  } from '$lib/utils/hero';

  import * as styles from './index.css';

  export let hero;
  export let heroUserData;

  const borderColorByGrade = {
    0: 'yellow10',
    1: 'green10',
    2: 'blue10',
    3: 'plum10',
    4: 'orange10',
    5: 'red10',
  };

  const backgroundColorByGrade = {
    0: 'yellow3',
    1: 'green3',
    2: 'blue3',
    3: 'plum3',
    4: 'orange3',
    5: 'red3',
  };
</script>

<GridItem title="Skills" full>
  <div class={styles.skillsContainer}>
    {#each hero.skills as skill, index}
      <div>
        <div class={styles.skillContainer}>
          <div>
            <img
              class={styles.skillIcon}
              loading="lazy"
              src={`/images/heroSkills/heroSkill${hero.id.toString().padStart(2, '0')}_${
                index + 1
              }.png`}
              alt={formatSkillName(skill.name)}
            />
          </div>
          <div>
            <Heading>{formatSkillName(skill.name)}</Heading>
            <Text
              >{formatSkillDescription(
                skill,
                index,
                heroUserData?.grade ?? hero.gradeContainer,
                hero
              )}</Text
            >
          </div>
        </div>
        <div class={styles.skillProgressionContainer}>
          {#each skill.progression as skillLevel, idx}
            <div
              class={[
                styles.skillProgression,
                sprinkles({
                  borderColor: borderColorByGrade[idx],
                  background: backgroundColorByGrade[idx],
                  opacity: isCurrentSkillLevel(heroUserData?.grade ?? hero.baseGrade, index, idx)
                    ? 1
                    : 0.5,
                }),
              ].join(' ')}
            >
              <Text textAlign="center" fontSize="xs" fontFamily="mono"
                >{formatSkillValue(hero, skill, skillLevel)}</Text
              >
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</GridItem>
