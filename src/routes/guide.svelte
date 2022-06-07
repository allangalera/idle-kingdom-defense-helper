<script lang="ts">
  import Heading from '$lib/components/Heading/index.svelte';
  import HeroInline from '$lib/components/HeroInline/index.svelte';
  import Link from '$lib/components/Link/index.svelte';
  import Text from '$lib/components/Text/index.svelte';

  import * as styles from './guide.css';
</script>

<div>
  <div>
    <img src="/images/guide/GeneralHeroGuidelines.png" alt="General Hero Guidelines" />
    <i>
      <Heading fontSize="2xl">Disclaimer:</Heading>
      <Text
        >this hero guide I made may not be the most perfect one, this guide was made based on my
        in-game experience & knowledge, and mostly with the help & insights from the more & most
        experienced players on the <Link href="https://discord.gg/ikd">Discord</Link><br />You are
        welcome to follow the guides/tier list or not</Text
      >
    </i>
    <br />
    <Text>There are 2 types of heroes in the game:</Text>
    <ul>
      <li class={styles.liBefore}>
        <Text as="span"
          ><strong>Support Heroes</strong>, they are mainly used for
          <strong>dealing damage</strong>,
          <strong>crowd controls</strong>, and <strong>buffers</strong> (give significant power ups to
          heroes, castle archers, healing castle, etc.)</Text
        >
      </li>
      <li class={styles.liBefore}>
        <Text as="span"
          ><strong>Warrior Heroes</strong>, they are mainly used for <strong>distraction</strong> &
          <strong>crowd control</strong> only</Text
        >
      </li>
    </ul>
    <br />
    <Text
      ><i
        ><strong>Crowd Control</strong> in this game refers to any of the
        <strong>de-buffs effect</strong>
        that was given to the <strong>enemy</strong></i
      ><br />Mainly from these elements that are available in the game:</Text
    >
    <ul>
      <li class={styles.liBefore}>
        <Text as="span">Ice/Frost > Slows the enemy movements and ATK Speed</Text>
      </li>
      <li class={styles.liBefore}><Text as="span">Fire/Burn > Reduce the enemy ATK</Text></li>
      <li class={styles.liBefore}><Text as="span">Poison > Reduce the enemy DEF</Text></li>
      <li class={styles.liBefore}>
        <Text as="span">Electric > Paralyze/Stuns the enemy (Stops the enemy completely)</Text>
      </li>
    </ul>
    <br />
    <Text>Upgrading your heroes:</Text>
    <ul>
      <li class={styles.liBefore}>
        <Text as="span" fontWeight="bold">Leveling Heroes&nbsp</Text>
        <Text as="span"
          >(with <img
            loading="lazy"
            src="images/icons/iconGold.png"
            alt="gold icon"
            width="20rem"
            height="auto"
            style="vertical-align:middle;"
          />
          &
          <img
            loading="lazy"
            src="images/icons/iconSoul.png"
            alt="soulstone icon"
            width="20rem"
            height="auto"
            style="vertical-align:middle;"
          />
          ) will make your heroes stronger by&nbsp</Text
        >
        <Text as="span" fontWeight="bold">increasing their base stats&nbsp</Text>
        <Text as="span">(ATK, HP, DEF, etc.)</Text>
      </li>
      <li class={styles.liBefore}>
        <Text as="span" fontWeight="bold">Ascending Heroes&nbsp</Text>
        <Text as="span">(with&nbsp</Text>
        <img
          loading="lazy"
          src="images/icons/iconEvolveStone.png"
          alt="ascension stone"
          width="20rem"
          height="auto"
          style="vertical-align:middle;"
        />
        <Text as="span">&nbsp& Hero Shards) will&nbsp</Text>
        <Text as="span" fontWeight="bold">increase cap level&nbsp</Text>
        <Text as="span">of heroes, heroes&nbsp</Text>
        <Text as="span" fontWeight="bold">base stats&nbsp</Text>
        <Text as="span">(ATK, HP, DEF, etc.),&nbsp</Text>
        <Text as="span" fontWeight="bold">multiplier</Text>
        <Text as="span">, and mainly&nbsp</Text>
        <Text as="span" fontWeight="bold">improve skill effectiveness.</Text>
      </li>
    </ul>
    <br />
    <Text>What is the best way to obtain heroes shards?</Text>
    <ul>
      <li class={styles.liBefore}>
        <Text as="span"
          >Only use the <strong>ultra summoning</strong> from the Hero Fountain menu.</Text
        >
      </li>
      <li class={styles.liBefore}>
        <Text as="span"
          >Buy some needed hero shards with ancient coins in the Hero Fountain menu.</Text
        >
      </li>
    </ul>
  </div>
  <br />
  <div>
    <img src="/images/guide/GeneralHeroTierListCBA.png" alt="General Hero Tier List for C B A" />
    <Heading fontSize="2xl">General Hero Tier List</Heading>
    <Text>Who is the best support & warriors to use?</Text>
    <Text
      >Generally <strong>S tier Heroes</strong> are hard to come by and it usually takes longer to upgrade
      them.</Text
    >
    <Text>Unlike <strong>A, B & C tier Heroes</strong> that are way easier to collect.</Text>
    <br />
    <Text
      >While waiting for the <strong>S tier Heroes</strong> to drop, these are the most recommended
      <strong>A, B & C tier Heroes</strong> to use.</Text
    >
    <br />
    <Text fontWeight="bold">A, B & C tier Support Heroes:</Text>
    <br />
    <Text
      >Top tier: <HeroInline name="Evan" /><HeroInline name="Luke" /><HeroInline
        name="Tristan"
      /></Text
    >
    <Text
      >recommended (Depending on the situation): <HeroInline name="Mason" /><HeroInline
        name="Xavier"
      /><HeroInline name="Austin" /></Text
    >
    <Text
      ><HeroInline name="Evan" />Evan CC (Freeze) is top tier. Max rarity <HeroInline name="Evan" />
      basically stops the enemy movement & attack</Text
    >
    <Text
      ><HeroInline name="Luke" />buffs the ATK speed of all Support Heroes (Except summoners)</Text
    >
    <Text
      ><HeroInline name="Tristan" />buffs the ATK speed of all Support Heroes (Except summoners)</Text
    >
    <Text><HeroInline name="Mason" />has high/very good CC rating (Paralyzing/Stuns)</Text>
    <Text
      ><HeroInline name="Xavier" />summons a lot of troops to distract enemy, easy to ascent. Strong
      at early until mid game</Text
    >
    <Text
      ><HeroInline name="Austin" />deals AoE damage to the enemies with moderate CC ratings (Stuns)</Text
    >
    <br />
    <Text fontWeight="bold">A, B & C tier Warrior Heroes:</Text>
    <br />
    <Text>Top Tier: <HeroInline name="Ryan" /><HeroInline name="Leonidas" /></Text>
    <Text
      >Recommended (Depending on the situation): <HeroInline name="Randolph" /><HeroInline
        name="Diego"
      /></Text
    >
    <Text><HeroInline name="Ryan" />Highest CC rating (Frost) with dodge</Text>
    <Text><HeroInline name="Leonidas" />High CC rating (Paralyze) with dodge</Text>
    <Text><HeroInline name="Randolph" />High CC rating (Paralyze)</Text>
    <Text><HeroInline name="Diego" />Moderately High CC rating (Paralyze)</Text>
    <br />
    <Text
      ><strong>Dodge</strong> is needed so the warriors don't die. This becomes a non-issue later when
      decent hero gear gives all warrior heroes enough dodge to survive basically anything.</Text
    >
  </div>
  <br />
  <div>
    <img src="/images/guide/GeneralHeroTierListS.png" alt="General Hero Tier List for S" />
    <Text
      ><strong>S Tier Heroes</strong> contains some of the best/mandatory Heroes in the game, but due
      to their rarity, it's harder to upgrade them. Some of them need certain rarity to shine.</Text
    >
    <br />
    <Text fontWeight="bold">S Tier Support Heroes:</Text>
    <br />
    <Text
      >Top Tier: <HeroInline name="Gabriel" /><HeroInline name="Sophia" /><HeroInline
        name="Christian"
      /><HeroInline name="Marian" /></Text
    >
    <Text>Very recommended to use: <HeroInline name="Camilla" /><HeroInline name="Harold" /></Text>
    <Text><HeroInline name="Gabriel" />Buffs archers ATK damage & Crit. Mandarory Hero</Text>
    <Text
      ><HeroInline name="Sophia" />Heals & Improve Castle Def. Very important at mid-late Game.</Text
    >
    <Text
      ><HeroInline name="Christian" />Damage dealers. AoE basic ATK with Burn CC de-buffs (Reduce
      enemy ATK)</Text
    >
    <Text
      ><HeroInline name="Marian" />Damage dealers. Great AoE skull with strong freeze CC de-buffs
      (Reduce enemy movement & ATK speed)</Text
    >
    <Text><HeroInline name="Camilla" />Damage dealers with Burc CC de-buffs (Reduce enemy ATK)</Text
    >
    <Text
      ><HeroInline name="Harold" />Moderate damage dealers. High CC ratings (Proc chance, Cooldown &
      Duration ratio)</Text
    >
    <br />
    <Text fontWeight="bold">S Tier Warrior Heroes:</Text>
    <Text
      >Top Tier: <HeroInline name="Hilde" /><HeroInline name="Rodrick" /><HeroInline
        name="Anthony"
      /></Text
    >
    <Text
      ><HeroInline name="Hilde" />De-buffs enemy ATK & Paralyze them. Great at distracting Enemy.</Text
    >
    <Text><HeroInline name="Rodrick" />High & Strong Burn CC de-buffs (Reduce enemy ATK)</Text>
    <Text><HeroInline name="Anthony" />High CC Rating de-buffs (Paralyzing)</Text>
    <br />
    <Heading fontSize="2xl"
      >Other heroes that are not recommended in the current meta is because of some of these
      reasons:</Heading
    >
    <Text
      ><HeroInline name="Vincent" /><HeroInline name="Raven" /><HeroInline name="Ellie" /> (Poison &
      DEF scales badly in the game)</Text
    >
    <Text
      ><HeroInline name="Logan" /><HeroInline name="Carlos" /> (Summon less unit than <HeroInline
        name="Xavier"
      /> & summonders scale badly later)</Text
    >
    <Text><HeroInline name="Adrian" /> (Harder/Slower to ascend)</Text>
    <Text
      ><HeroInline name="Julian" /><HeroInline name="Blake" /><HeroInline
        name="Marcus"
      /><HeroInline name="Miguel" /><HeroInline name="Jackson" /> (Low CC Ratings, Cooldown : CC duration)</Text
    >
    <Text
      ><HeroInline name="Daniel" /> (Movement speed on warriors is not needed & deals low damage)</Text
    >
    <Text><HeroInline name="Brian" /> (Warriors rarely die & deals low damage)</Text>
    <Text><HeroInline name="Aisha" /> (Warriors rarely die)</Text>
    <Text
      ><HeroInline name="Lucas" /> (Hard to ascend, long skill cooldown, push-back skill tend to seperate
      enemies hence it's harder for CC/AoE based heroes to target them)</Text
    >
  </div>
  <br />
  <div>
    <img src="/images/guide/StageProgressionGuide.png" alt="Stage Progression Guide" />
    <Heading fontSize="2xl">Heroes usage based on stage progression</Heading>
    <br />
    <Text as="span"><strong>Very early game</strong> (Stage 1 to 1000-ish)</Text>
    <ul>
      <li class={styles.liBefore}>
        <Text as="span"
          >Just use any heroes that give you the <strong>most damage</strong> to
          <strong>push</strong>
          your <strong>stage progression</strong>.</Text
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
    <Text><strong>Early Game</strong> (Stage 1000 to 2500-ish)</Text>
    <ul>
      <li class={styles.liBefore}>
        <Text as="span"
          >Summoners ( <HeroInline name="Xavier" /> & <HeroInline name="Adrian" /> ) will be very strong
          at this state.</Text
        >
      </li>
      <li class={styles.liBefore}>
        <Text as="span"
          >Start priorizing the heroes you have <strong>based on the tier list</strong></Text
        >
      </li>
      <li class={styles.liBefore}>
        <Text as="span"
          >Focus on <HeroInline name="Luke" /><HeroInline name="Tristan" /><HeroInline
            name="Evan"
          /><HeroInline name="Mason" /> with new S heroes you get</Text
        >
      </li>
    </ul>
    <Text as="span"><strong>Early-mid game</strong> (Stage 2500 to 5000-ish)</Text>
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
    <Text as="span"><strong>Mid Game</strong> (Stage 5000 to 7500-ish)</Text>
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
    <Text as="span"><strong>Mid-late game</strong> (Stage 7500 to 10,000-ish)</Text>
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
    <Text as="span"><strong>Late game</strong> (Stage 10,000+)</Text>
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
      ><strong>Important notes</strong>: The Hero tier list was made for
      <strong>pushing stage progression</strong>
      composition, completing <strong>portals</strong>, <strong>expeditions</strong>,
      <strong>event dungeons</strong>, <strong>conquests</strong>, etc.</Text
    >
    <Text><strong>Not</strong> for <strong>farming</strong> (Repeating completed stages)</Text>
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
  </div>
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
</div>
