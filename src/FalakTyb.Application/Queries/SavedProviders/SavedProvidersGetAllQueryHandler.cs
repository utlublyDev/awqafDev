
using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;

namespace awqaf.Application.Queries
{
    public class SavedProvidersGetAllQueryHandler : IRequestHandler<SavedProvidersGetAllQuery, IPage<SavedProviders>>
    {
        private IReadOnlySavedProvidersRepository _savedProvidersRepository;

        public SavedProvidersGetAllQueryHandler(
            IReadOnlySavedProvidersRepository savedProvidersRepository)
        {
            _savedProvidersRepository = savedProvidersRepository;
        }

        public async Task<IPage<SavedProviders>> Handle(SavedProvidersGetAllQuery request, CancellationToken cancellationToken)
        {
            var page = await _savedProvidersRepository.QueryHelper()
                .GetPageAsync(request.Page);
            return page;
        }
    }
}
