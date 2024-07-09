using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class FrequentlyAskedQuestionsDeleteCommand : IRequest<Unit>
    {
        public long Id { get; set; }
    }
}
