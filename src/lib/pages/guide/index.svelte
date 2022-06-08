<script lang="ts">
  import Heading from '$lib/components/Heading/index.svelte';
  import HeroInline from '$lib/components/HeroInline/index.svelte';
  import Link from '$lib/components/Link/index.svelte';
  import Text from '$lib/components/Text/index.svelte';

  import * as styles from './index.css';
</script>

<div class={styles.container}>
  <section class={styles.section}>
    <Heading fontSize="2xl" textAlign="center" marginBottom={6}>General Hero Guidelines</Heading>
    <Text
      ><i
        ><Text as="span" fontSize="xl">Disclaimer:</Text> this guide was copied from the <Link
          href="https://discord.gg/ikd"
          target="_blank">Discord</Link
        >. So the information here can be outdated. To get the most recent information go to the
        Discord server and look for the channel <b>#guide</b>.</i
      ></Text
    >
    <br />
    <Text
      ><i
        ><Text as="span" fontSize="xl">Disclaimer:</Text> this hero guide I made may not be the most
        perfect one, this guide was made based on my in-game experience & knowledge, and mostly with
        the help & insights from the more & most experienced players on the <Link
          href="https://discord.gg/ikd"
          target="_blank">Discord</Link
        >.</i
      ></Text
    >
    <br />
    <Text>You are welcome to follow the guides/tier list or not.</Text>
    <br />
    <Text>There are 2 types of heroes in the game:</Text>
    <ul>
      <li class={styles.liBefore}>
        <Text
          ><b>Support Heroes</b>, they are mainly used for
          <b>dealing damage</b>,
          <b>crowd controls</b>, and <b>buffers</b> (give significant power ups to heroes, castle archers,
          healing castle, etc.)</Text
        >
      </li>
      <li class={styles.liBefore}>
        <Text
          ><b>Warrior Heroes</b>, they are mainly used for <b>distraction</b> &
          <b>crowd control</b> only</Text
        >
      </li>
    </ul>
    <br />
    <Text
      ><i
        ><b>Crowd Control</b> in this game refers to any of the
        <b>de-buffs effect</b>
        that was given to the <b>enemy</b></i
      ><br />Mainly from these elements that are available in the game:</Text
    >
    <ul>
      <li class={styles.liBefore}>
        <Text>Ice/Frost > Slows the enemy movements and ATK Speed</Text>
      </li>
      <li class={styles.liBefore}><Text>Fire/Burn > Reduce the enemy ATK</Text></li>
      <li class={styles.liBefore}><Text>Poison > Reduce the enemy DEF</Text></li>
      <li class={styles.liBefore}>
        <Text>Electric > Paralyze/Stuns the enemy (Stops the enemy completely)</Text>
      </li>
    </ul>
    <br />
    <Text>Upgrading your heroes:</Text>
    <ul>
      <li class={styles.liBefore}>
        <Text
          ><b>Leveling Heroes</b> (with
          <img
            loading="lazy"
            src="images/icons/iconGold.png"
            alt="gold icon"
            class={styles.imageAlignMiddle}
          />
          &
          <img
            loading="lazy"
            src="images/icons/iconSoul.png"
            alt="soulstone icon"
            class={styles.imageAlignMiddle}
          />) will make your heroes stronger by <b>increasing their base stats</b> (ATK, HP, DEF, etc.)</Text
        >
      </li>
      <li class={styles.liBefore}>
        <Text>
          <b>Ascending Heroes</b> (with
          <img
            loading="lazy"
            src="images/icons/iconEvolveStone.png"
            alt="ascension stone"
            title="Ascension Stone"
            class={styles.imageAlignMiddle}
          />
          &
          <img
            loading="lazy"
            src="images/icons/iconScrollHero.png"
            alt="hero shard"
            title="Hero Shard"
            class={styles.imageAlignMiddle}
          />) will <b>increase cap level</b> of heroes, heroes <b>base</b> stats (ATK, HP, DEF,
          etc.),
          <b>multiplier</b>, and mainly <b>improve skill effectiveness</b>.
        </Text>
      </li>
    </ul>
    <br />
    <Text>What is the best way to obtain heroes shards?</Text>
    <ul>
      <li class={styles.liBefore}>
        <Text as="span">Only use the <b>ultra summoning</b> from the Hero Fountain menu.</Text>
      </li>
      <li class={styles.liBefore}>
        <Text as="span"
          >Buy some needed hero shards with ancient coins in the Hero Fountain menu.</Text
        >
      </li>
    </ul>
  </section>
  <section class={styles.section}>
    <Heading fontSize="2xl" textAlign="center" marginBottom={6}
      >General Hero Tier List for <img
        loading="lazy"
        src="images/icons/iconGearQuality1.png"
        alt="hero shard"
        title="Hero Shard"
        class={styles.imageAlignMiddle}
      />
      <img
        loading="lazy"
        src="images/icons/iconGearQuality2.png"
        alt="hero shard"
        title="Hero Shard"
        class={styles.imageAlignMiddle}
      />
      <img
        loading="lazy"
        src="images/icons/iconGearQuality3.png"
        alt="hero shard"
        title="Hero Shard"
        class={styles.imageAlignMiddle}
      /></Heading
    >
    <Text>Who is the best support & warriors to use?</Text>
    <Text
      >Generally <b>S tier Heroes</b> are hard to come by and it usually takes longer to upgrade them.</Text
    >
    <Text>Unlike <b>A, B & C tier Heroes</b> that are way easier to collect.</Text>
    <br />
    <Text
      >While waiting for the <b>S tier Heroes</b> to drop, these are the most recommended
      <b>A, B & C tier Heroes</b> to use.</Text
    >
    <br />
    <Text fontWeight="bold">A, B & C tier Support Heroes:</Text>
    <br />
    <ul class={styles.liBefore}>
      <li>
        <Text
          >Top tier: <HeroInline name="Evan" /><HeroInline name="Luke" /><HeroInline
            name="Tristan"
          /></Text
        >
      </li>
      <li>
        <Text
          >recommended (Depending on the situation): <HeroInline name="Mason" /><HeroInline
            name="Xavier"
          /><HeroInline name="Austin" /></Text
        >
      </li>
      <li>
        <Text
          ><HeroInline name="Evan" />Evan CC (Freeze) is top tier. Max rarity <HeroInline
            name="Evan"
          />
          basically stops the enemy movement & attack</Text
        >
      </li>
      <li>
        <Text
          ><HeroInline name="Luke" />buffs the ATK speed of all Support Heroes (Except summoners)</Text
        >
      </li>
      <li>
        <Text
          ><HeroInline name="Tristan" />buffs the ATK speed of all Support Heroes (Except summoners)</Text
        >
      </li>
      <li>
        <Text><HeroInline name="Mason" />has high/very good CC rating (Paralyzing/Stuns)</Text>
      </li>
      <li>
        <Text
          ><HeroInline name="Xavier" />summons a lot of troops to distract enemy, easy to ascent.
          Strong at early until mid game</Text
        >
      </li>
      <li>
        <Text
          ><HeroInline name="Austin" />deals AoE damage to the enemies with moderate CC ratings
          (Stuns)</Text
        >
      </li>
    </ul>
    <br />
    <Text fontWeight="bold">A, B & C tier Warrior Heroes:</Text>
    <br />

    <ul class={styles.liBefore}>
      <li><Text>Top Tier: <HeroInline name="Ryan" /><HeroInline name="Leonidas" /></Text></li>
      <li>
        <Text
          >Recommended (Depending on the situation): <HeroInline name="Randolph" /><HeroInline
            name="Diego"
          /></Text
        >
      </li>
      <li><Text><HeroInline name="Ryan" />Highest CC rating (Frost) with dodge</Text></li>
      <li><Text><HeroInline name="Leonidas" />High CC rating (Paralyze) with dodge</Text></li>
      <li><Text><HeroInline name="Randolph" />High CC rating (Paralyze)</Text></li>
      <li><Text><HeroInline name="Diego" />Moderately High CC rating (Paralyze)</Text></li>
    </ul>
    <br />
    <Text
      ><b>Dodge</b> is needed so the warriors don't die. This becomes a non-issue later when decent hero
      gear gives all warrior heroes enough dodge to survive basically anything.</Text
    >
  </section>
  <section class={styles.section}>
    <Heading fontSize="2xl" textAlign="center" marginBottom={6}
      >General Hero Tier List for <img
        loading="lazy"
        src="images/icons/iconGearQuality4.png"
        alt="hero shard"
        title="Hero Shard"
        class={styles.imageAlignMiddle}
      /></Heading
    >
    <Text
      ><b>S Tier Heroes</b> contains some of the best/mandatory Heroes in the game, but due to their
      rarity, it's harder to upgrade them. Some of them need certain rarity to shine.</Text
    >
    <br />
    <Text fontWeight="bold">S Tier Support Heroes:</Text>
    <ul class={styles.liBefore}>
      <li>
        <Text
          >Top Tier: <HeroInline name="Gabriel" /><HeroInline name="Sophia" /><HeroInline
            name="Christian"
          /><HeroInline name="Marian" /></Text
        >
      </li>
      <li>
        <Text
          >Very recommended to use: <HeroInline name="Camilla" /><HeroInline name="Harold" /></Text
        >
      </li>
      <li>
        <Text><HeroInline name="Gabriel" />Buffs archers ATK damage & Crit. Mandarory Hero</Text>
      </li>
      <li>
        <Text
          ><HeroInline name="Sophia" />Heals & Improve Castle Def. Very important at mid-late Game.</Text
        >
      </li>
      <li>
        <Text
          ><HeroInline name="Christian" />Damage dealers. AoE basic ATK with Burn CC de-buffs
          (Reduce enemy ATK)</Text
        >
      </li>
      <li>
        <Text
          ><HeroInline name="Marian" />Damage dealers. Great AoE skull with strong freeze CC
          de-buffs (Reduce enemy movement & ATK speed)</Text
        >
      </li>
      <li>
        <Text
          ><HeroInline name="Camilla" />Damage dealers with Burc CC de-buffs (Reduce enemy ATK)</Text
        >
      </li>
      <li>
        <Text
          ><HeroInline name="Harold" />Moderate damage dealers. High CC ratings (Proc chance,
          Cooldown & Duration ratio)</Text
        >
      </li>
    </ul>
    <br />
    <Text fontWeight="bold">S Tier Warrior Heroes:</Text>
    <ul class={styles.liBefore}>
      <li>
        <Text
          >Top Tier: <HeroInline name="Hilde" /><HeroInline name="Rodrick" /><HeroInline
            name="Anthony"
          /></Text
        >
      </li>
      <li>
        <Text
          ><HeroInline name="Hilde" />De-buffs enemy ATK & Paralyze them. Great at distracting
          Enemy.</Text
        >
      </li>
      <li>
        <Text><HeroInline name="Rodrick" />High & Strong Burn CC de-buffs (Reduce enemy ATK)</Text>
      </li>
      <li><Text><HeroInline name="Anthony" />High CC Rating de-buffs (Paralyzing)</Text></li>
    </ul>
    <br />
    <Text fontWeight="bold"
      >Other heroes that are not recommended in the current meta is because of some of these
      reasons:</Text
    >
    <ul class={styles.liBefore}>
      <li>
        <Text
          ><HeroInline name="Vincent" /><HeroInline name="Raven" /><HeroInline name="Ellie" /> (Poison
          & DEF scales badly in the game)</Text
        >
      </li>
      <li>
        <Text
          ><HeroInline name="Logan" /><HeroInline name="Carlos" /> (Summon less unit than <HeroInline
            name="Xavier"
          /> & summonders scale badly later)</Text
        >
      </li>
      <li><Text><HeroInline name="Adrian" /> (Harder/Slower to ascend)</Text></li>
      <li>
        <Text
          ><HeroInline name="Julian" /><HeroInline name="Blake" /><HeroInline
            name="Marcus"
          /><HeroInline name="Miguel" /><HeroInline name="Jackson" /> (Low CC Ratings, Cooldown : CC
          duration)</Text
        >
      </li>
      <li>
        <Text
          ><HeroInline name="Daniel" /> (Movement speed on warriors is not needed & deals low damage)</Text
        >
      </li>
      <li><Text><HeroInline name="Brian" /> (Warriors rarely die & deals low damage)</Text></li>
      <li><Text><HeroInline name="Aisha" /> (Warriors rarely die)</Text></li>
      <li>
        <Text
          ><HeroInline name="Lucas" /> (Hard to ascend, long skill cooldown, push-back skill tend to
          seperate enemies hence it's harder for CC/AoE based heroes to target them)</Text
        >
      </li>
    </ul>
  </section>
  <section class={styles.section}>
    <Heading fontSize="2xl" textAlign="center" marginBottom={6}>Stage Progression Guide</Heading>
    <Heading fontSize="xl">Heroes usage based on stage progression</Heading>
    <br />
    <Text as="span"><b>Very early game</b> (Stage 1 to 1000-ish)</Text>
    <ul>
      <li class={styles.liBefore}>
        <Text as="span"
          >Just use any heroes that give you the <b>most damage</b> to
          <b>push</b>
          your <b>stage progression</b>.</Text
        >
      </li>
      <li class={styles.liBefore}>
        <Text as="span">Any S tier heroes you get will be very strong at this state.</Text>
      </li>
      <li class={styles.liBefore}>
        <Text as="span"
          >Start focusing on <HeroInline name="Luke" /><HeroInline name="Tristan" /><HeroInline
            name="Evan"
          /><HeroInline name="Mason" /><HeroInline name="Xavier" /></Text
        >
      </li>
    </ul>
    <Text><b>Early Game</b> (Stage 1000 to 2500-ish)</Text>
    <ul>
      <li class={styles.liBefore}>
        <Text as="span"
          >Summoners ( <HeroInline name="Xavier" /> & <HeroInline name="Adrian" /> ) will be very strong
          at this state.</Text
        >
      </li>
      <li class={styles.liBefore}>
        <Text as="span">Start priorizing the heroes you have <b>based on the tier list</b></Text>
      </li>
      <li class={styles.liBefore}>
        <Text as="span"
          >Focus on <HeroInline name="Luke" /><HeroInline name="Tristan" /><HeroInline
            name="Evan"
          /><HeroInline name="Mason" /> with new S heroes you get</Text
        >
      </li>
    </ul>
    <Text as="span"><b>Early-mid game</b> (Stage 2500 to 5000-ish)</Text>
    <ul>
      <li class={styles.liBefore}>
        <Text as="span">Summoners will still be strong at this state</Text>
      </li>
      <li class={styles.liBefore}>
        <Text as="span"
          >Focus on <HeroInline name="Luke" /><HeroInline name="Tristan" /><HeroInline
            name="Evan"
          /><HeroInline name="Mason" />or<HeroInline name="Austin" /></Text
        >
      </li>
      <li class={styles.liBefore}>
        <Text as="span"
          >Start focusing on your warriors <HeroInline name="Ryan" /><HeroInline
            name="Leonidas"
          /><HeroInline name="Randolph" /><HeroInline name="Diego" /> with new S heroes you get</Text
        >
      </li>
    </ul>
    <Text as="span"><b>Mid Game</b> (Stage 5000 to 7500-ish)</Text>
    <ul>
      <li class={styles.liBefore}>
        <Text as="span">Summoners will start to fall off</Text>
      </li>
      <li class={styles.liBefore}>
        <Text as="span">Focus on A, B, C Tier heroes, with other better S heroes you have</Text>
      </li>
      <li class={styles.liBefore}>
        <Text as="span"
          >Start focusing on your <HeroInline name="Sophia" /> level and ascension and <HeroInline
            name="Gabriel"
          /> ascension.</Text
        >
      </li>
      <li class={styles.liBefore}>
        <Text as="span">Use recommended meta warriors</Text>
      </li>
    </ul>
    <Text as="span"><b>Mid-late game</b> (Stage 7500 to 10,000-ish)</Text>
    <ul>
      <li class={styles.liBefore}>
        <Text as="span">Summoners will be replaced</Text>
      </li>
      <li class={styles.liBefore}>
        <Text as="span">Your <HeroInline name="Sophia" /> should be good enough to use</Text>
      </li>
      <li class={styles.liBefore}>
        <Text as="span">Use recommended meta support & warriors</Text>
      </li>
    </ul>
    <Text as="span"><b>Late game</b> (Stage 10,000+)</Text>
    <ul>
      <li class={styles.liBefore}>
        <Text as="span"
          >Use <HeroInline name="Gabriel" /><HeroInline name="Sophia" /><HeroInline
            name="Luke"
          /><HeroInline name="Tristan" /> + CC support heroes of your choice</Text
        >
      </li>
      <li class={styles.liBefore}>
        <Text as="span">Use the best warriors you have</Text>
      </li>
      <li class={styles.liBefore}>
        <Text as="span"
          >You should be experienced enough to decide your best heroes formation for yourself</Text
        >
      </li>
    </ul>
    <br />
    <Text
      ><b>Important notes</b>: The Hero tier list was made for
      <b>pushing stage progression</b>
      composition, completing <b>portals</b>, <b>expeditions</b>,
      <b>event dungeons</b>, <b>conquests</b>, etc.</Text
    >
    <Text><b>Not</b> for <b>farming</b> (Repeating completed stages)</Text>
    <br />
    <Text
      >This was the current meta heroes that was proven effective and already being tested multiple
      times by the most experienced players in this server. You are welcome to follow this guide or
      not, but this should be a safe & good reference for all of the players.</Text
    >
    <Text
      >Ultimately, you have to decide for yourself which heroes is the best for your team (Levels,
      Ascension, Need more/less CC, etc.) Everyone have different luck on every heroes, so there's
      no fixed 100% hero tier list guide that you must follow.
    </Text>
    <Text
      >If there's still any questions unanswered, confusions, need any personal preferences, please
      ask them on the Discord server.</Text
    >
    <Text
      >Or if you have any suggestions for the guides to be better, please discuss it on the Discord
      server.</Text
    >
    <Text
      >Remember to play the game as how you wanted it to be, and please have fun experimenting</Text
    >
  </section>
</div>
