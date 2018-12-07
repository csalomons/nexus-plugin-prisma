import { prismaObjectType } from 'nexus-prisma'
import { stringArg } from 'gqliteral'

export const Query = prismaObjectType('Query', t => {
  t.prismaFields(['post'])

  t.field('feed', 'Post', {
    list: true,
    resolve: (parent, args, ctx) => {
      return ctx.prisma.posts({
        where: { published: true },
      })
    },
  })

  t.field('filterPosts', 'Post', {
    list: true,
    args: {
      searchString: stringArg({ required: true }),
    },
    resolve: (parent, { searchString }, ctx) => {
      return ctx.prisma.posts({
        where: {
          OR: [
            {
              title_contains: searchString,
            },
            {
              content_contains: searchString,
            },
          ],
        },
      })
    },
  })
})
