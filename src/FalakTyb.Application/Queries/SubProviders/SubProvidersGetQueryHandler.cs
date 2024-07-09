
using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Queries
{
    public class SubProvidersGetQueryHandler : IRequestHandler<SubProvidersGetQuery, SubProviders>
    {
        private IReadOnlySubProvidersRepository _subProvidersRepository;

        public SubProvidersGetQueryHandler(
            IReadOnlySubProvidersRepository subProvidersRepository)
        {
            _subProvidersRepository = subProvidersRepository;
        }

        public async Task<SubProviders> Handle(SubProvidersGetQuery request, CancellationToken cancellationToken)
        {
            var entity = await _subProvidersRepository.QueryHelper()
                .GetOneAsync(subProviders => subProviders.Id == request.Id);
            return entity;
        }
    }
}
