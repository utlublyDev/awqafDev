
using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Queries
{
    public class ProvidersGetQueryHandler : IRequestHandler<ProvidersGetQuery, Providers>
    {
        private IReadOnlyProvidersRepository _providersRepository;

        public ProvidersGetQueryHandler(
            IReadOnlyProvidersRepository providersRepository)
        {
            _providersRepository = providersRepository;
        }

        public async Task<Providers> Handle(ProvidersGetQuery request, CancellationToken cancellationToken)
        {
            var entity = await _providersRepository.QueryHelper()
                .Include(providers => providers.ProvidersCategories)
                .GetOneAsync(providers => providers.Id == request.Id);
            return entity;
        }



    }
}
