import { PrismaClient } from '@prisma/client';
import { projects } from './../src/mockData/projects'
import { skills  } from './../src/mockData/skills'
import { stack } from './../src/mockData/stack'
import { footerItems  } from './../src/mockData/footer'
import { aboutMe  } from './../src/mockData/aboutMe'

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Начинаем заполнение базы...');

  await prisma.skill.createMany({ data: skills });
  await prisma.stack.createMany({ data: stack });
  await prisma.footerItem.createMany({ data: footerItems });

   await prisma.aboutMe.create({
    data: {
      birth: aboutMe.birth,
      placeBirth: aboutMe.placeBirth,
      education: aboutMe.education,
      location: aboutMe.location,
      shortBio: aboutMe.shortBio,
      workExperience: {
        create: aboutMe.workExperience.map((exp) => ({
          organization: exp.organization,
          position: exp.position,
          startDate: exp.workingPeriod.startDate,
          endDate: exp.workingPeriod.endDate,
          description: exp.description,
        })),
      },
    },
  });

  for (const projectData of projects) {
    const project = await prisma.project.create({
      data: {
        category: projectData.category,
        name: projectData.name,
        shortDescription: projectData.shortDescrition,
        previewDescription: projectData.previewDescription,
        date: projectData.date,
        developmentTime: projectData.developmentTime,
        githubLink: projectData.gitHubLink,
        demoLink: projectData.demoLink,
        numberTeam: projectData.numberTeam,
        teamType: projectData.teamType,

        images: {
          create: projectData.images.map((img) => ({
            image: img.image,
            main: img.main,
          })),
        },

        stack: {
          create: projectData.stack.map((item) => ({
            name: item.name,
            icon: item.icon,
            tooltip: item.tooltip ?? {},
          })),
        },

        keyFeatures: {
          create: (projectData.keyFeatures || []).map((feature) => ({
            title: feature.title,
            text: feature.text,
            icon: feature.icon,
            photo: feature.photo,
          })),
        },

        description: {
          create: projectData.description.map((desc) => ({
            title: desc.title,
            icon: desc.icon,
            content: desc.content,
          })),
        },

        metrics: {
          create: projectData.metrics.map((metric) => ({
            icon: metric.icon,
            title: metric.title,
            text: metric.text,
            current: typeof metric.current === 'string' ? parseFloat(metric.current) : metric.current,
            max: metric.max,
            type: metric.type,
          })),
        },

        commits: {
          create: projectData.commits.map((commit) => ({
            name: commit.name,
            date: commit.date,
            text: commit.text,
          })),
        },
      },
    });

    console.log(`✅ Добавлен проект: ${project.name}`);
  }

  console.log('✅ База успешно заполнена!');
}

main()
  .catch((e) => {
    console.error('❌ Ошибка при заполнении:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());