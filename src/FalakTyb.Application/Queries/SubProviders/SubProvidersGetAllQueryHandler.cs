
using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;

namespace awqaf.Application.Queries
{
    public class SubProvidersGetAllQueryHandler : IRequestHandler<SubProvidersGetAllQuery, IPage<SubProviders>>
    {
        private IReadOnlySubProvidersRepository _subProvidersRepository;

        public SubProvidersGetAllQueryHandler(
            IReadOnlySubProvidersRepository subProvidersRepository)
        {
            _subProvidersRepository = subProvidersRepository;
        }

        public async Task<IPage<SubProviders>> Handle(SubProvidersGetAllQuery request, CancellationToken cancellationToken)
        {
            var page = await _subProvidersRepository.QueryHelper()
                .GetPageAsync(request.Page);
            return page;
        }
    }
}
