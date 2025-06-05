import { PetGender, PetSize, PostStatus, PostType } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { prisma } from '../src/config/prisma';

async function main() {
  // Limpar o banco de dados
  await prisma.notification.deleteMany();
  await prisma.notificationToken.deleteMany();
  await prisma.post.deleteMany();
  await prisma.pet.deleteMany();
  await prisma.user.deleteMany();

  // Criar usuários
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: 'João Silva',
        email: 'joao@email.com',
        password: await bcrypt.hash('123456', 10),
        whatsapp: '11999999999',
        instagram: '@joaosilva',
        contactPreference: 'WHATSAPP',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Maria Santos',
        email: 'maria@email.com',
        password: await bcrypt.hash('123456', 10),
        whatsapp: '11988888888',
        instagram: '@mariasantos',
        contactPreference: 'INSTAGRAM',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Pedro Oliveira',
        email: 'pedro@email.com',
        password: await bcrypt.hash('123456', 10),
        whatsapp: '11977777777',
        instagram: '@pedrooliveira',
        contactPreference: 'WHATSAPP',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Ana Costa',
        email: 'ana@email.com',
        password: await bcrypt.hash('123456', 10),
        whatsapp: '11966666666',
        instagram: '@anacosta',
        contactPreference: 'INSTAGRAM',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Lucas Mendes',
        email: 'lucas@email.com',
        password: await bcrypt.hash('123456', 10),
        whatsapp: '11955555555',
        instagram: '@lucasmendes',
        contactPreference: 'WHATSAPP',
      },
    }),
  ]);

  // Dados dos pets
  const petsData = [
    // João Silva
    {
      name: 'Rex',
      type: 'DOG',
      breed: 'Labrador',
      age: '2',
      gender: PetGender.MALE,
      size: PetSize.MEDIUM,
      description: 'Cachorro muito dócil e brincalhão',
      castrated: true,
      vaccinated: true,
      location: 'São Paulo',
    },
    {
      name: 'Thor',
      type: 'DOG',
      breed: 'Pastor Alemão',
      age: '3',
      gender: PetGender.MALE,
      size: PetSize.LARGE,
      description: 'Cachorro muito protetor e leal',
      castrated: true,
      vaccinated: true,
      location: 'São Paulo',
    },
    {
      name: 'Bella',
      type: 'DOG',
      breed: 'Golden Retriever',
      age: '1',
      gender: PetGender.FEMALE,
      size: PetSize.MEDIUM,
      description: 'Cachorra muito carinhosa e brincalhona',
      castrated: true,
      vaccinated: true,
      location: 'São Paulo',
    },
    {
      name: 'Max',
      type: 'DOG',
      breed: 'Bulldog',
      age: '2',
      gender: PetGender.MALE,
      size: PetSize.MEDIUM,
      description: 'Cachorro muito tranquilo e amigável',
      castrated: true,
      vaccinated: true,
      location: 'São Paulo',
    },

    // Maria Santos
    {
      name: 'Luna',
      type: 'CAT',
      breed: 'Siamês',
      age: '1',
      gender: PetGender.FEMALE,
      size: PetSize.SMALL,
      description: 'Gata muito carinhosa e independente',
      castrated: true,
      vaccinated: true,
      location: 'Rio de Janeiro',
    },
    {
      name: 'Milo',
      type: 'CAT',
      breed: 'Persa',
      age: '2',
      gender: PetGender.MALE,
      size: PetSize.SMALL,
      description: 'Gato muito tranquilo e elegante',
      castrated: true,
      vaccinated: true,
      location: 'Rio de Janeiro',
    },
    {
      name: 'Nina',
      type: 'CAT',
      breed: 'Maine Coon',
      age: '1',
      gender: PetGender.FEMALE,
      size: PetSize.MEDIUM,
      description: 'Gata muito sociável e brincalhona',
      castrated: true,
      vaccinated: true,
      location: 'Rio de Janeiro',
    },
    {
      name: 'Oliver',
      type: 'CAT',
      breed: 'Ragdoll',
      age: '2',
      gender: PetGender.MALE,
      size: PetSize.MEDIUM,
      description: 'Gato muito dócil e carinhoso',
      castrated: true,
      vaccinated: true,
      location: 'Rio de Janeiro',
    },

    // Pedro Oliveira
    {
      name: 'Rocky',
      type: 'DOG',
      breed: 'Rottweiler',
      age: '2',
      gender: PetGender.MALE,
      size: PetSize.LARGE,
      description: 'Cachorro muito protetor e leal',
      castrated: true,
      vaccinated: true,
      location: 'Belo Horizonte',
    },
    {
      name: 'Lola',
      type: 'DOG',
      breed: 'Poodle',
      age: '1',
      gender: PetGender.FEMALE,
      size: PetSize.SMALL,
      description: 'Cachorra muito inteligente e brincalhona',
      castrated: true,
      vaccinated: true,
      location: 'Belo Horizonte',
    },
    {
      name: 'Zeus',
      type: 'DOG',
      breed: 'Husky Siberiano',
      age: '2',
      gender: PetGender.MALE,
      size: PetSize.MEDIUM,
      description: 'Cachorro muito energético e amigável',
      castrated: true,
      vaccinated: true,
      location: 'Belo Horizonte',
    },
    {
      name: 'Daisy',
      type: 'DOG',
      breed: 'Beagle',
      age: '1',
      gender: PetGender.FEMALE,
      size: PetSize.SMALL,
      description: 'Cachorra muito curiosa e brincalhona',
      castrated: true,
      vaccinated: true,
      location: 'Belo Horizonte',
    },

    // Ana Costa
    {
      name: 'Simba',
      type: 'CAT',
      breed: 'Bengala',
      age: '1',
      gender: PetGender.MALE,
      size: PetSize.MEDIUM,
      description: 'Gato muito ativo e brincalhão',
      castrated: true,
      vaccinated: true,
      location: 'Curitiba',
    },
    {
      name: 'Lily',
      type: 'CAT',
      breed: 'Sphynx',
      age: '2',
      gender: PetGender.FEMALE,
      size: PetSize.SMALL,
      description: 'Gata muito carinhosa e sociável',
      castrated: true,
      vaccinated: true,
      location: 'Curitiba',
    },
    {
      name: 'Charlie',
      type: 'CAT',
      breed: 'Munchkin',
      age: '1',
      gender: PetGender.MALE,
      size: PetSize.SMALL,
      description: 'Gato muito fofo e brincalhão',
      castrated: true,
      vaccinated: true,
      location: 'Curitiba',
    },
    {
      name: 'Mia',
      type: 'CAT',
      breed: 'Abissínio',
      age: '2',
      gender: PetGender.FEMALE,
      size: PetSize.SMALL,
      description: 'Gata muito inteligente e ativa',
      castrated: true,
      vaccinated: true,
      location: 'Curitiba',
    },

    // Lucas Mendes
    {
      name: 'Apollo',
      type: 'DOG',
      breed: 'Doberman',
      age: '2',
      gender: PetGender.MALE,
      size: PetSize.LARGE,
      description: 'Cachorro muito inteligente e protetor',
      castrated: true,
      vaccinated: true,
      location: 'Salvador',
    },
    {
      name: 'Ruby',
      type: 'DOG',
      breed: 'Shih Tzu',
      age: '1',
      gender: PetGender.FEMALE,
      size: PetSize.SMALL,
      description: 'Cachorra muito carinhosa e tranquila',
      castrated: true,
      vaccinated: true,
      location: 'Salvador',
    },
    {
      name: 'Toby',
      type: 'DOG',
      breed: 'Border Collie',
      age: '2',
      gender: PetGender.MALE,
      size: PetSize.MEDIUM,
      description: 'Cachorro muito inteligente e ativo',
      castrated: true,
      vaccinated: true,
      location: 'Salvador',
    },
    {
      name: 'Sophie',
      type: 'DOG',
      breed: 'Yorkshire',
      age: '1',
      gender: PetGender.FEMALE,
      size: PetSize.SMALL,
      description: 'Cachorra muito carinhosa e brincalhona',
      castrated: true,
      vaccinated: true,
      location: 'Salvador',
    },
  ];

  // Criar pets
  const pets = await Promise.all(
    petsData.map((petData, index) =>
      prisma.pet.create({
        data: {
          ...petData,
          userId: users[Math.floor(index / 4)].id,
        },
      })
    )
  );

  // Criar posts
  const posts = await Promise.all(
    pets.map((pet, index) => {
      // Distribuir os tipos de post
      let postType;
      if (index % 3 === 0) {
        postType = PostType.ADOPTION;
      } else if (index % 3 === 1) {
        postType = PostType.LOST;
      } else {
        postType = PostType.FOUND;
      }

      // Criar títulos e conteúdos específicos para cada tipo
      let title, content;
      switch (postType) {
        case PostType.ADOPTION:
          title = `${pet.name} para adoção`;
          content = `${pet.description}. Procura um lar amoroso e responsável.`;
          break;
        case PostType.LOST:
          title = `${pet.name} desapareceu`;
          content = `${pet.name} desapareceu na região de ${pet.location}. ${pet.description}. Por favor, entre em contato se tiver informações.`;
          break;
        case PostType.FOUND:
          title = `Encontrei um ${pet.type.toLowerCase()}`;
          content = `Encontrei um ${pet.type.toLowerCase()} ${pet.breed.toLowerCase()} na região de ${pet.location}. ${pet.description}. Por favor, entre em contato se for seu pet.`;
          break;
      }

      return prisma.post.create({
        data: {
          title,
          content,
          type: postType,
          status: PostStatus.ACTIVE,
          petId: pet.id,
          userId: pet.userId,
        },
      });
    })
  );

  // Criar tokens de notificação para cada usuário
  const notificationTokens = await Promise.all(
    users.map((user) =>
      prisma.notificationToken.create({
        data: {
          token: `expo-token-${user.id}`,
          userId: user.id,
        },
      })
    )
  );

  // Criar algumas notificações de exemplo
  const notifications = await Promise.all(
    posts.slice(0, 5).map((post) =>
      prisma.notification.create({
        data: {
          message: `Novo interesse em ${post.title}`,
          userId: post.userId,
          postId: post.id,
        },
      })
    )
  );

  console.log('Seed concluído com sucesso!');
  console.log(`Criados ${users.length} usuários`);
  console.log(`Criados ${pets.length} pets`);
  console.log(`Criados ${posts.length} posts`);
  console.log(`Criados ${notificationTokens.length} tokens de notificação`);
  console.log(`Criados ${notifications.length} notificações`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 