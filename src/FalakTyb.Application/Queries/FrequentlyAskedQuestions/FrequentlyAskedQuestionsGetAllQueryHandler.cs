
using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;

namespace awqaf.Application.Queries
{
    public class FrequentlyAskedQuestionsGetAllQueryHandler : IRequestHandler<FrequentlyAskedQuestionsGetAllQuery, IPage<FrequentlyAskedQuestions>>
    {
        private IReadOnlyFrequentlyAskedQuestionsRepository _frequentlyAskedQuestionsRepository;

        public FrequentlyAskedQuestionsGetAllQueryHandler(
            IReadOnlyFrequentlyAskedQuestionsRepository frequentlyAskedQuestionsRepository)
        {
            _frequentlyAskedQuestionsRepository = frequentlyAskedQuestionsRepository;
        }

        public async Task<IPage<FrequentlyAskedQuestions>> Handle(FrequentlyAskedQuestionsGetAllQuery request, CancellationToken cancellationToken)
        {
            var page = await _frequentlyAskedQuestionsRepository.QueryHelper()
                .GetPageAsync(request.Page);
            return page;
        }
    }
}
