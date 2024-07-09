
using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Queries
{
    public class FrequentlyAskedQuestionsGetQueryHandler : IRequestHandler<FrequentlyAskedQuestionsGetQuery, FrequentlyAskedQuestions>
    {
        private IReadOnlyFrequentlyAskedQuestionsRepository _frequentlyAskedQuestionsRepository;

        public FrequentlyAskedQuestionsGetQueryHandler(
            IReadOnlyFrequentlyAskedQuestionsRepository frequentlyAskedQuestionsRepository)
        {
            _frequentlyAskedQuestionsRepository = frequentlyAskedQuestionsRepository;
        }

        public async Task<FrequentlyAskedQuestions> Handle(FrequentlyAskedQuestionsGetQuery request, CancellationToken cancellationToken)
        {
            var entity = await _frequentlyAskedQuestionsRepository.QueryHelper()
                .GetOneAsync(frequentlyAskedQuestions => frequentlyAskedQuestions.Id == request.Id);
            return entity;
        }
    }
}
