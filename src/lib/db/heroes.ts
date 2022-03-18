import heroesJSON from '$lib/gameInfo/heroes.json';
import heroGradesJSON from '$lib/gameInfo/heroGrades.json';
import mainSkillJSON from '$lib/gameInfo/mainSkill.json';
import buffSkillJSON from '$lib/gameInfo/buffSkill.json';
import summonSkillJSON from '$lib/gameInfo/summonSkill.json';
import langJSON from '$lib/gameInfo/lang.json';
import { omit, sortWith, ascend, prop, groupBy } from 'ramda';

function getHeroAscension(heroId: number) {
	return heroGradesJSON.filter((heroGrade) => heroGrade.heroId === heroId);
}

function getSummonSkill(hero) {
	const summonSkill = summonSkillJSON.find(
		(summonSkillItem) => summonSkillItem.id === hero.mainSkill
	);

	return {
		name: langJSON[summonSkill.name],
		desc: langJSON[summonSkill.name],
		coolTime: hero.skillCoolTime,
		progression: [
			{
				units: summonSkill.summonN,
				time: summonSkill.summonTime,
			},
		],
	};
}

function getBuffSkill(hero) {
	const buffSkill = buffSkillJSON.find((buffSkillItem) => buffSkillItem.id === hero.mainSkill);

	return {
		name: langJSON[buffSkill.name],
		desc: langJSON[buffSkill.name],
		coolTime: hero.skillCoolTime,
		progression: [
			{
				value: buffSkill.effectK,
			},
		],
	};
}

function getMainSkill(hero) {
	const mainSkill = mainSkillJSON.find((mainSkillItem) => mainSkillItem.id === hero.mainSkill);
	return {
		...omit(
			[
				'assetId',
				'bottomAssetId',
				'description',
				'desc',
				'icon',
				'rangeAssetId',
				'soundHit',
				'soundFire',
				'summonAssetId',
			],
			mainSkill
		),
		name: langJSON[mainSkill.name],
		desc: langJSON[mainSkill.desc],
		coolTime: hero.skillCoolTime,
		progression: [
			{
				value: mainSkill.atkK,
			},
		],
	};
}

function getSkill(hero: any) {
	const skillTypes = {
		1: getMainSkill,
		2: getBuffSkill,
		3: getSummonSkill,
	};
	return skillTypes[hero.skillType](hero);
}

function getHeroSkills(hero: any, ascension: any) {
	const skills = [getSkill(hero)];
	skills.push({
		name: langJSON[`${hero.skillKey}NAME_2`],
		desc: langJSON[`${hero.skillKey}DESC_2`],
		progression: [],
	});
	skills.push({
		name: langJSON[`${hero.skillKey}NAME_3`],
		desc: langJSON[`${hero.skillKey}DESC_3`],
		progression: [],
	});
	skills.push({
		name: langJSON[`${hero.skillKey}NAME_4`],
		desc: langJSON[`${hero.skillKey}DESC_4`],
		progression: [],
	});
	skills.push({
		name: langJSON[`${hero.skillKey}NAME_5`],
		desc: langJSON[`${hero.skillKey}DESC_5`],
		progression: [],
	});

	for (let index = 1; index < ascension.length; index++) {
		const currentSkill = (ascension[index].grade - 1) % 5;
		skills[currentSkill].progression.push({
			value: ascension[index].value,
			durTime: ascension[index].durTime,
			percentage: ascension[index].percentage,
		});
	}
	return skills;
}

function generateHeroList() {
	const heroes = heroesJSON.map((hero) => {
		const ascension = getHeroAscension(hero.id);
		const skills = getHeroSkills(hero, ascension);
		return {
			...omit(['skillKey', 'assetId', 'img', 'name'], hero),
			name: langJSON[hero.name],
			ascension,
			skills,
		};
	});
	return heroes;
}

const sortByBaseGradeAndName = sortWith([ascend(prop('baseGrade')), ascend(prop('name'))]);

const groupByTier = groupBy((hero) => hero.baseGrade);

export const heroes = sortByBaseGradeAndName(generateHeroList());

export const heroesGroupByTier = groupByTier(heroes);
